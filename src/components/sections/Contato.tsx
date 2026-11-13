import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { conteudo, ui } from "@/content/site";
import { buildWhatsAppUrl, mascararTelefone, montarMensagem } from "@/lib/whatsapp";
import { usePerfil } from "@/lib/perfil";
import { MolduraFoto } from "@/components/ui/MolduraFoto";
import { Container } from "@/components/ui/Container";
import { Botao } from "@/components/ui/Botao";
import { Chip } from "@/components/ui/Chip";

const f = conteudo.formulario;
const e = f.etapas;
const TOTAL = 5;

const schema = z.object({
  objetivo: z.string().min(1, "Escolha um objetivo para continuar"),
  momento: z.string().min(1, "Escolha a opção mais próxima de você"),
  modalidade: z.string().max(60).optional(),
  horarios: z.array(z.string()).min(1, "Escolha pelo menos um período"),
  nome: z.string().trim().min(2, "Informe seu nome"),
  whatsapp: z
    .string()
    .refine(
      (v) => /^\d{10,11}$/.test(v.replace(/\D/g, "")),
      "Informe seu WhatsApp com DDD, ex.: 11 91234-5678",
    ),
  mensagem: z.string().max(300).optional(),
});
type Dados = z.infer<typeof schema>;

const camposPorEtapa: (keyof Dados)[][] = [
  ["objetivo"],
  ["momento"],
  ["horarios"],
  ["nome", "whatsapp", "mensagem"],
];

export function Contato() {
  const [etapa, setEtapa] = useState(0);
  const [urlEnviada, setUrlEnviada] = useState<string | null>(null);
  const { perfil } = usePerfil();
  const reduzido = useReducedMotion();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Dados>({
    resolver: zodResolver(schema),
    defaultValues: {
      objetivo: "",
      momento: "",
      modalidade: "",
      horarios: [],
      nome: "",
      whatsapp: "",
      mensagem: "",
    },
  });

  // Pré-preenche a partir da escolha em "Para quem"
  useEffect(() => {
    if (!perfil) return;
    const op = conteudo.paraQuem.opcoes[perfil];
    setValue("objetivo", op.objetivoPadrao);
    setValue("momento", op.momentoPadrao);
  }, [perfil, setValue]);

  const v = watch();
  const ehAtleta = v.momento === "Sou atleta";

  async function avancar() {
    const ok = await trigger(camposPorEtapa[etapa]);
    if (ok) setEtapa((n) => Math.min(n + 1, TOTAL - 1));
  }

  function enviar(d: Dados) {
    const url = buildWhatsAppUrl(
      montarMensagem({
        nome: d.nome,
        whatsapp: d.whatsapp.replace(/\D/g, ""),
        objetivo: d.objetivo,
        momento: d.momento,
        modalidade: d.momento === "Sou atleta" ? d.modalidade : undefined,
        horarios: d.horarios,
        mensagem: d.mensagem,
      }),
    );
    setUrlEnviada(url);
    const w = window.open(url, "_blank", "noopener");
    if (!w) window.location.href = url;
  }

  const resumo: { rotulo: string; valor: string; etapa: number }[] = [
    { rotulo: "Objetivo", valor: v.objetivo, etapa: 0 },
    {
      rotulo: "Momento",
      valor: ehAtleta && v.modalidade ? `${v.momento} (${v.modalidade})` : v.momento,
      etapa: 1,
    },
    { rotulo: "Horários", valor: (v.horarios ?? []).join(", "), etapa: 2 },
    { rotulo: "Nome", valor: v.nome, etapa: 3 },
    { rotulo: "WhatsApp", valor: v.whatsapp, etapa: 3 },
    ...(v.mensagem ? [{ rotulo: "Dúvida", valor: v.mensagem, etapa: 3 }] : []),
  ];

  const erro = (msg?: string) =>
    msg ? (
      <p role="alert" className="mt-3 text-sm text-ouro-claro">
        {msg}
      </p>
    ) : null;

  const campo =
    "mt-2 w-full rounded-painel border border-grafite bg-preto px-4 py-3 text-giz placeholder:text-concreto focus-visible:border-ouro";

  return (
    <section id="contato" className="superficie-concreto py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-painel border border-grafite bg-carbono p-6 md:p-10 ">
          <h2 className="titulo text-2xl md:text-3xl">{f.titulo}</h2>
          <p className="mt-3 text-concreto">{f.texto}</p>

          {/* Pista: barra de progresso dourada */}
          <div
            className="mt-8"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={TOTAL}
            aria-valuenow={etapa + 1}
            aria-label={`${ui.etapaRotulo} ${etapa + 1} ${ui.de} ${TOTAL}`}
          >
            <div className="h-0.5 bg-grafite">
              <motion.div
                className="linha-ouro origin-left"
                initial={false}
                animate={{ scaleX: (etapa + 1) / TOTAL }}
                transition={{ duration: reduzido ? 0.15 : 0.32, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>

          {urlEnviada ? (
            <p className="mt-8" role="status">
              <a
                className="underline decoration-ouro underline-offset-4"
                href={urlEnviada}
                target="_blank"
                rel="noopener noreferrer"
              >
                {f.confirmacao}
              </a>
            </p>
          ) : (
            <form
              noValidate
              className="mt-8"
              onSubmit={(ev) => {
                ev.preventDefault();
                if (etapa < TOTAL - 1) void avancar();
                else void handleSubmit(enviar)(ev);
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={etapa}
                  initial={{ opacity: 0, x: reduzido ? 0 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduzido ? 0.15 : 0.2 }}
                >
                  {etapa === 0 && (
                    <fieldset>
                      <legend className="titulo text-xl">{e.objetivo.pergunta}</legend>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {e.objetivo.opcoes.map((o) => (
                          <Chip key={o} tipo="radio" rotulo={o} value={o} {...register("objetivo")} />
                        ))}
                      </div>
                      {erro(errors.objetivo?.message)}
                    </fieldset>
                  )}

                  {etapa === 1 && (
                    <fieldset>
                      <legend className="titulo text-xl">{e.momento.pergunta}</legend>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {e.momento.opcoes.map((o) => (
                          <Chip key={o} tipo="radio" rotulo={o} value={o} {...register("momento")} />
                        ))}
                      </div>
                      {erro(errors.momento?.message)}
                      {ehAtleta && (
                        <label className="mt-6 block">
                          {e.momento.perguntaModalidade}
                          <input type="text" maxLength={60} className={campo} {...register("modalidade")} />
                        </label>
                      )}
                    </fieldset>
                  )}

                  {etapa === 2 && (
                    <fieldset>
                      <legend className="titulo text-xl">{e.horarios.pergunta}</legend>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {e.horarios.opcoes.map((o) => (
                          <Chip key={o} tipo="checkbox" rotulo={o} value={o} {...register("horarios")} />
                        ))}
                      </div>
                      {erro(errors.horarios?.message)}
                    </fieldset>
                  )}

                  {etapa === 3 && (
                    <fieldset className="space-y-5">
                      <legend className="titulo text-xl">{e.dados.pergunta}</legend>
                      <label className="mt-5 block">
                        {e.dados.nome}
                        <input type="text" autoComplete="name" className={campo} {...register("nome")} />
                        {erro(errors.nome?.message)}
                      </label>
                      <label className="block">
                        {e.dados.whatsapp}
                        <input
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          className={campo}
                          placeholder="(11) 91234-5678"
                          maxLength={15}
                          {...register("whatsapp", {
                            onChange: (ev) => {
                              ev.target.value = mascararTelefone(ev.target.value);
                            },
                          })}
                        />
                        {erro(errors.whatsapp?.message)}
                      </label>
                      <label className="block">
                        {e.dados.mensagem}
                        <textarea rows={3} maxLength={300} className={campo} {...register("mensagem")} />
                      </label>
                    </fieldset>
                  )}

                  {etapa === 4 && (
                    <div>
                      <h3 className="titulo text-xl">{e.resumo.titulo}</h3>
                      <dl className="mt-5 divide-y divide-grafite border-y border-grafite">
                        {resumo.map((r) => (
                          <div key={r.rotulo} className="flex items-start justify-between gap-4 py-3">
                            <div>
                              <dt className="text-sm text-concreto">{r.rotulo}</dt>
                              <dd>{r.valor}</dd>
                            </div>
                            <button
                              type="button"
                              onClick={() => setEtapa(r.etapa)}
                              aria-label={`${e.resumo.editar} ${r.rotulo}`}
                              className="min-h-11 px-2 text-sm text-ouro underline underline-offset-4"
                            >
                              {e.resumo.editar}
                            </button>
                          </div>
                        ))}
                      </dl>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-4">
                {etapa > 0 && (
                  <Botao variante="contorno" onClick={() => setEtapa((n) => n - 1)}>
                    {f.botoes.voltar}
                  </Botao>
                )}
                <Botao type="submit" className="flex-1 sm:flex-none">
                  {etapa === TOTAL - 1
                    ? f.botoes.enviar
                    : etapa === TOTAL - 2
                      ? f.botoes.montar
                      : f.botoes.proximo}
                </Botao>
              </div>
            </form>
          )}
        </div>

        <div className="relative mx-auto hidden w-full max-w-[22rem] lg:block">
          <p className="titulo mb-8 text-xl text-balance">{ui.contatoFrase}</p>
          <MolduraFoto
            src={conteudo.paraQuem.opcoes.geral.imagem}
            alt={ui.imagens.sorrindo}
            width={1200}
            height={1500}
            sizes="22rem"
            traco="concreto"
            className="mx-auto w-full max-w-sm lg:mr-4 lg:max-w-none"
          />
        </div>
      </Container>
    </section>
  );
}
