'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  Zap, 
  UserPlus, 
  RefreshCw, 
  FileText, 
  AlertTriangle, 
  CreditCard, 
  Trash2, 
  Clock, 
  MapPin, 
  Mail, 
  ArrowLeftRight,
  ClipboardList,
  Scissors,
  Activity,
  MessageSquare,
  RotateCcw,
  Gauge,
  Banknote,
  ShieldAlert,
  History,
  Menu,
  Pin,
  X,
  Info,
  Heart,
  Star
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Tooltip = ({ text, children, position = 'top' }: { text: string, children: React.ReactNode, position?: 'top' | 'bottom' | 'left' | 'right' }) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  return (
    <div className="group/tooltip relative inline-flex items-center justify-center">
      {children}
      <div className={cn(
        "absolute hidden group-hover/tooltip:block z-50 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-[10px] font-bold rounded-lg shadow-2xl pointer-events-none whitespace-nowrap border border-slate-700/50",
        positionClasses[position]
      )}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 2 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="flex items-center gap-1.5"
        >
          {text}
        </motion.div>
      </div>
    </div>
  );
};

interface Template {
  id: string;
  title: string;
  content: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  templates: Template[];
  info?: string;
  showNegotiationTable?: boolean;
}

const SERVICE_CATEGORIES: Category[] = [
  {
    id: 'alteracao',
    name: 'Alteração Cadastral',
    icon: <UserPlus className="w-5 h-5" />,
    templates: [
      {
        id: 'parceiro-negocio',
        title: 'Dados do Parceiro de Negócio',
        content: '*** VEIO AO ATENDIMENTO PORTANDO CPF E RG E SOLICITA ATUALIZAÇÃO DOS SEUS DADOS CADATRAIS CONFORME A DOCUMENTAÇÃO APRESENTADA.'
      },
      {
        id: 'instalacao',
        title: 'Dados de Instalação',
        content: '*** VEIO AO ATENDIMENTO PORTANDO CPF E RG E DOCUMENTAÇÃO PARA SOLICITAR A ALTERAÇÃO DOS DADOS CONFORME A DOCUMENTAÇÃO APRESENTADA.\nENDEREÇO DO SISTEMA:\nENDEREÇO CONFORME A DOCUMENTAÇÃO APRESENTADA:'
      },
      {
        id: 'alteracao-classe',
        title: 'Alteração Classe Consumo',
        content: 'CLIENTE VEIO ATE O ATENDIMENTO PORTANDO RG E CPF, O MESMO SOLICITA ALTERACAO DE CLASSE PARA RESIDENCIAL/COMERCIAL. ESTA CIENTE DO PRAZO.\nTELEFONE:'
      }
    ]
  },
  {
    id: 'ligacao-nova',
    name: 'Ligação Nova',
    icon: <Zap className="w-5 h-5" />,
    info: 'Na aba “ Meios de comunicação: Caso cliente não tenha e-mail ou não queira informar, como campo é obrigatório, preencher campo de e-mail com: naoinformado@equatorialenergia.com.br\n\nIMPORTANTE: Salvar arquivo como “Carta de Deferimento assinada_UC XXXX”',
    templates: [
      {
        id: 'padrao-completo',
        title: 'Com Padrão Completo Pronto',
        content: 'COORD. GEOGRÁFICAS: XXXXXXXXXXXXXXXXXX; XXXXXXXXXXXXXXXXXX\nPONTO DE REFERÊNCIA: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nANÁLISE DUP CADASTRO? SIM \nPADRÃO INSTALADO EXTERNAMENTE?  SIM \nCHECKLIST PADRÃO MONTADO ASSINADO PELO CLIENTE? SIM \nPOSSUI REDE ELÉTRICA PROX. AO IMÓVEL? SIM / NAO\nAMPERAGEM DO DISJUNTOR : 25A\nA INSTALAÇÃO POSSUI OU CONTARÁ  COM CARREGADORES PARA VEÍCULOS ELÉTRICOS ?  SIM / NÃO \nCASO  SIM, INFORMAR DADOS DO CARREGADOR : (Potência e modelo da estação de carregamento ou carregador portátil Casos Específicos)\nTELEFONE: XXXXXXXXXXXXX \nWHATSAPP: XXXXXXXXXXXXX\nE-MAIL VÁLIDO: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nENDEREÇO DA CONEXÃO É O MESMO ENDEREÇO DE CORRESPONDÊNCIA? SIM \nENDEREÇO CORRESPONDÊNCIA: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXX  VEIO AO ATENDIMENTO E SOLICITOU CONEXÃO. CIENTE DO PRAZO DE VISTORIA E QUE, EM CASO DE PADRÃO INCOMPLETO/INEXISTENTE, SEU PEDIDO SERÁ REJEITADO. \n**ANEXO DOC. DO SOLICITANTE E FORMULÁRIO DE CONEXÃO ASSINADO.'
      },
      {
        id: 'financiamento-padrao',
        title: 'Com Financiamento de Padrão',
        content: 'COORD. GEOGRÁFICAS: XXXXXXXXXXXXXXXXXX; XXXXXXXXXXXXXXXXXX\nPONTO DE REFERÊNCIA: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nANÁLISE DUP CADASTRO? SIM \nPADRÃO INSTALADO EXTERNAMENTE?   NÃO\nPADRÃO FINANCIADO: FPC5 OU PFC7\n PARCELADO: XXx R$ XX \nLOCAL DEMARCADO: SIM OU NÃO (DESCREVER O LOCAL)\nPOSSUI REDE ELÉTRICA PROX. AO IMÓVEL? SIM \nA INSTALAÇÃO POSSUI OU CONTARÁ  COM CARREGADORES PARA VEÍCULOS ELÉTRICOS ?  SIM / NÃO \nCASO  SIM, INFORMAR DADOS DO CARREGADOR : (Potência e modelo da estação de carregamento ou carregador portátil Casos Específicos)\nTELEFONE: XXXXXXXXXXXXX \nWHATSAPP: XXXXXXXXXXXXX\nE-MAIL VÁLIDO: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nENDEREÇO DA CONEXÃO É O MESMO ENDEREÇO DE CORRESPONDÊNCIA? SIM \nENDEREÇO CORRESPONDÊNCIA: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nASSINOU FORMULÁRIO DE FINANC. DE PADRÃO? SIM \nXXXXXXXXXXXXXX  VEIO AO ATENDIMENTO E SOLICITOU CONEXÃO COM FINANCIAMENTO DE PADRÃO. CIENTE DO PRAZO DE VISTORIA.\n**ANEXO DOC. DO SOLICITANTE, FORMULÁRIO DE CONEXÃO E FORMULÁRIO DE FINACIAMENTO DE PADRÃO ASSINADOS.'
      },
      {
        id: 'oc-indeferimento',
        title: 'Script para Carta de Indeferimento',
        content: 'Sr.(a) compareceu ao atendimento portando RG e CPF para solicitação da conexão OC. Contudo, não apresentou documentos válidos de posse e/ou propriedade. Segue em anexo a carta de indeferimento devidamente assinada.'
      },
      {
        id: 'oc-deferimento-aprovada',
        title: 'Script para Carta de Deferimento Aprovada',
        content: 'DOCUMENTAÇÃO APROVADA.\nCARTA DE DEFERIMENTO ENTREGUE EM MÃOS AO SR(A)XXXXXXXX\nCARTA ASSINADA NO ANEXO DA NOTA'
      },
      {
        id: 'oc-deferimento-estudo',
        title: 'Script para Carta de Deferimento Aprovada c/ Estudo',
        content: 'DOCUMENTAÇÃO APROVADA C/ ESTUDO\nCARTA DE DEFERIMENTO ENTREGUE EM MÃOS AO SR(A)XXXXXXXX\nCARTA ASSINADA NO ANEXO DA NOTA'
      }
    ]
  },
  {
    id: 'reativacao',
    name: 'Reativação',
    icon: <RefreshCw className="w-5 h-5" />,
    templates: [
      {
        id: 'reativacao-padrao',
        title: 'Reativação',
        content: 'PADRÃO INSTALADO:\nFASE: XXX\nCABO:XXX\nDISJUNTOR:XXX\nREFERÊNCIA:\nTELEFONE:\nCOORDENADAS:\nCLIENTE AFIRMA QUE JÁ POSSUI INSTALADO O PADRÃO DENTRO DO LIMITE DA VIA PÚBLICA E CIENTE QUE CASO A INEXISTÊNCIA SEU PEDIDO SERÁ REJEITADO\nCLIENTE CIENTE DO PRAZO DE 05 DIAS UTEIS PARA EXECUCAO.'
      }
    ]
  },
  {
    id: 'provisoria',
    name: 'Ligação Provisória',
    icon: <Clock className="w-5 h-5" />,
    templates: [
      {
        id: 'provisoria-geral',
        title: 'Ligação Provisória (Com/Sem Medição)',
        content: '• ( ) COM MEDIÇÃO ( ) SEM MEDIÇÃO\n• ENDEREÇO: xxxxxxxxxxxxxxxxxx\n• Ligar dia: XXXXXXX A PARTIR DAS XXXXXHRS\n• Desligar dia: XXXXXXX A PARTIR DAS XXXXXHRS\n• FASE: XXXX\n• CARGA DECLARADA: XXXXX\n• TELEFONE: XXXXXX\n• CLIENTE CIENTE DE TODAS AS INFORMAÇÕES.\n• NOME COMPLETO: XXXXXXXXXXX\n• NOME DA MÃE: XXXXXXXXXX\n• DATA DE NASCIMENTO: XX/XX/XXXX\n• NATURALIDADE: XXXXXXX'
      }
    ]
  },
  {
    id: 'troca-titularidade',
    name: 'Troca de Titularidade',
    icon: <ArrowLeftRight className="w-5 h-5" />,
    templates: [
      {
        id: 'sem-debito',
        title: 'Sem Débito',
        content: `CLIENTE: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nRG: XXX\nCPF: XXXXXXXXXXX\nSOLICITAÇÃO: TROCA DE TITULARIDADE DA INSTALAÇÃO XXXXX, ATUALMENTE EM NOME DE XXXXXXXXXXXXXXX\nMOTIVO DA TROCA:\nDATA DE OCUPAÇÃO: 00/00/0000\nDÉBITOS NA INSTALAÇÃO: ( ) SIM – VALOR: ( ) NÃO\nOBSERVAÇÕES:\nTROCA DE TITULARIDADE REALIZADA SEM DOCUMENTO DE POSSE OU PROPRIEDADE, SOMENTE\nEM CASOS QUE NÃO TEM DEBITOS NA UC\nCONFORME PREVISTO NO INFORMATIVO 029/2025`
      },
      {
        id: 'analise-troca',
        title: 'Análise de Troca de Titularidade',
        content: `FAVOR REALIZAR A TROCA DE TITULARIDADE DA UC XXXXXXXXX
QUE SE ENCONTRA EM NOME DE XXXXXXXXXXXXXXXXXXXXXXXXX
PARA O NOME DO NOVO TITULAR XXXXXXXXXXXXXXXXXXXXXXX
RG XXXXXXXXXXX
CPF XXXXXXXXXXXXXXX
MOTIVO DA TROCA: 
DOCUMENTAÇÃO APRESENTADA: 
DATA DE VIGÊNCIA: 
CLASSE DE CONSUMO: 
STATUS DA INSTALAÇÃO: LIGADA ( ) CORTADA ( ) DESLIGADA ( )
OBSERVAÇÕES: SE HOUVER`
      },
      {
        id: 'com-transferencia-debitos',
        title: 'Com Transferência de Débitos',
        content: `REALIZADA A TROCA DE TITULARIDADE COM TRANSFERÊNCIA 
E PARCELAMENTO DOS DÉBITOS DA UC XXXXXXXXXXXXXXX
QUE SE ENCONTRA EM NOME DE XXXXXXXXXXXXXXXXXXXXX
PARA O NOME DO NOVO TITULAR XXXXXXXXXXXXXXXXXXXXXX
RG XXXXXXXXXXXXX
CPF XXXXXXXXXXXXXXXX
AUTORIZADO PELO SOLICITANTE MEDIANTE ASSINATURA DOS TERMOS DTT, TATD, TCD E ADITIVO DE PARCELAMENTO ANEXO DENTRO DA NOTA.
SIMULAÇÃO DE PARCELAMENTO:
ENTRADA: XX% (R$XXX,XX)
QUANTIDADE DE PARCELAS: 6X (R$ XX,XX).
TIPO DE FATURAS ( ) CNR ( ) NORMAIS
TELEFONE: XXXXXXXXXXXXXXXXXX`
      },
      {
        id: 'troca-direta-com-debitos',
        title: 'Troca Direta com Débitos',
        content: 'SOLICITAÇÃO: TROCA DE TITULARIDADE DA INSTALAÇÃO XXXXX, ATUALMENTE EM NOME\nDE XXXXXXXXXXXXXX\nMOTIVO DA TROCA:\nDATA DE OCUPAÇÃO:\nDÉBITOS NA INSTALAÇÃO: ( ) SIM – VALOR: ( ) NÃO\nOBSERVAÇÕES:\nTROCA DE TITULARIDADE REALIZADA COM DOCUMENTO DE POSSE OU PROPRIEDADE, COM\nNOVO TITULAR ASSUMINDO POR LIVRE E ESPONTANEA VONTADE'
      },
      {
        id: 'troca-titularidade-unidades-geradoras',
        title: 'Troca de Titularidade de Unidades Geradoras',
        content: 'ABERTA PARA GARANTIR A EFETIVAÇÃO COMPLETA DO PROCESSO DE TROCA DE TITULARIDADE DA UNIDADE GERADORA. ESSA ETAPA É PARA A ATIVAÇÃO E MANUTENÇÃO DOS FLAGS DE GERAÇÃO DISTRIBUÍDA (GD) NO SISTEMA, ASSEGURANDO QUE A UNIDADE GERADORA CONTINUE DEVIDAMENTE CONFIGURADA PARA PARTICIPAÇÃO NO SISTEMA DE COMPENSAÇÃO DE ENERGIA ELÉTRICA (SCEE) E ATENDENDO ÀS REGULAMENTAÇÕES VIGENTES.'
      }
    ]
  },
  {
    id: 'parcelamento',
    name: 'Parcelamento',
    icon: <Banknote className="w-5 h-5" />,
    showNegotiationTable: true,
    templates: [
      {
        id: 'parcelamento-debitos',
        title: 'Parcelamento de Débitos',
        content: 'CLIENTE XXXXXXXXXXXX\nRG XXXXXXXXXX\nCPF XXXXXXXXXXXX\nSOLICITA PARCELAMENTO CONFORME O PARÂMETRO NO DIA 00/00/0000\nENTRADA: XX% (R$XXX,XX)\nQUANTIDADE DE PARCELAS: 6X (R$ 54,60).\nTIPO DE FATURAS ( ) CNR ( ) NORMAIS\nTELEFONE:'
      },
      {
        id: 'antecipacao-parcelamento',
        title: 'Antecipação de Parcelamento',
        content: '****VEIO AO ATENDIMENTO PORTANDO CPF E RG SOLICITAR ANTECIPAÇÃO DE PARCELAS DA NEGOCIAÇÃO ****.\nCIENTE QUE SERÃO ANTECIPADAS **** PARCELAS DE ****CADA, TOTALIZANDO ****. CIENTE QUE APÓS A ANTECIPAÇÃO NÃO TEM COMO REVERTER E AS PARCELAS SERÃO GERADAS SEPARADAMENTE DA FATURA DE CONSUMO NORMAL\nTIPO DE FATURAS ( ) CNR ( X ) NORMAIS\nTELEFONE: ****'
      }
    ]
  },
  {
    id: 'desligamento',
    name: 'Desligamento',
    icon: <Trash2 className="w-5 h-5" />,
    templates: [
      {
        id: 'desligamento-servico',
        title: 'Desligamento de Conta',
        content: 'REFERÊNCIA: XXXXX ,\nMOTIVO:\nIMOVEL DESOCUPADO FATURAMENTO FINAL: CONSUMO ESTIMADO ( )\nLEITURA DO CLIENTE ( ) LEITURA: xxxx\nCLIENTE TITULAR COMPARECEU NA AGENCIA (CIDADE) PARA SOLICITAR O DESLIGAMENTO DE SUA CONTA CONTRATO XXXXX, CLIENTE CIENTE QUE CASO HAJA DEBITO PENDENTES DEVERA QUITA-LOS PARA QUE SEU NOME NÃO SEJA NEGATIVADO, CIENTE DO PRAZO DE ATÉ 30 DIAS PARA DESLIGAMENTO EM CAMPO.'
      }
    ]
  },
  {
    id: 'danos',
    name: 'Danos Elétricos',
    icon: <ShieldAlert className="w-5 h-5" />,
    templates: [
      {
        id: 'danos-eletricos',
        title: 'Registro de Danos Elétricos',
        content: 'SRA. RECLAMANTE TITULAR: XXXXX\nDESCRIÇÃO DA OCORRÊNCIA COM DATA/HORA:\nCLIENTE RELATA QUE HOUVE XXXXXX,\nE QUANDO A ENERGIA RETORNOU ALGUNS EQUIPAMENTOS NÃO RESPONDERAM MAIS, E CONSTATOU QUE ESTÃO QUEIMADOS. DIA XX/XX/2024 POR VOLTA DAS XXX HRS. RELATO DO MOTIVO POR QUE SUPÕE QUE A RESPONSABILIDADE SEJA DA EMPRESA: JUSTIFICA QUE FOI POR CAUSA DA FALTA DE ENERGIA/APAGÃO (DESCREVER A JUSTIFICATIVA)\nDESCRIÇÃO DO EQUIPAMENTO DANIFICADO: EQUIPAMENTO 1: GELADEIRA 2 PORTAS, XX LITROS,\nMARCA: XXXXXX, MODELO: XXXXXX, TEMPO DE USO: X ANOS CONSERTADO: SIM/NÃO EQUIPAMENTO 2: FREEZER 1 PORTA, XX LITROS HORIZONTAL/VERTICAL, MARCA: XX, MODELO: XXXXX, TEMPO DE USO: X ANOS CONSERTADO: SIM/NÃO CHECKLIST:\nATINGIU OUTRAS RESIDÊNCIAS/INSTALAÇÕES: SIM/NÃO\nFALTOU ENERGIA OU A ENERGIA OSCILAVA ANTES DA QUEIMA: SIM/NÃO\nHAVIA FUNCIONÁRIO DA EMPRESA NO LOCAL EXECUTANDO ALGUM SERVIÇO: SIM/NÃO P\nOSSUI TELEFONE FIXO/ANTENA PARABÓLICA: SIM/NÃO\nCHOVIA NO DIA DA OCORRÊNCIA: SIM/NÃO\nSOLUÇÃO PRETENDIDA: RESSARCIMENTOS DOS EQUIPAMENTOS QUEIMADOS\nMEIO DE COMUNICAÇÃO ESCOLHIDO PELO CLIENTE: TELEFONE/CARTA/E-MAIL (DESCREVER O MEIO DE RESPOSTA) TELEFONE EXTRA PARA CONTATO: 99-999999999\nAUTORIZAÇÃO DE OUTRA PESSOA PARA RECEBER A RESPOSTA EM CASO DE AUSÊNCIA/IMPOSSIBILIDADE DO RECLAMANTE: NOME/GRAU DE PARENTESCO/TELEFONE FORMA DE RESSARCIMENTO CASO A RECLAMAÇÃO SEJA PROCEDENTE: CONTA BANCÁRIA/ORDEM DE PAGAMENTO/CRÉDITO EM FATURA/ABATIMENTO DA DÍVIDA'
      }
    ]
  },
  {
    id: 'tensao',
    name: 'Nível de Tensão',
    icon: <Activity className="w-5 h-5" />,
    templates: [
      {
        id: 'nivel-tensao',
        title: 'Oscilação de Tensão',
        content: '*** RECLAMA QUE ESTA OCORRENDO OSCILAÇÃO CONSTANTE NA INSTALAÇÃO HÁ MAIS DE 07 DIAS.\nINFORMA QUE OCORRE SEMPRE: TODOS OS DIAS ( ) FIM DE SEMANA ( ) ALGUNS DIAS DA SEMANA ( ) quais ? (INFORMAR O DIA DA SEMANA ESPECÍFICO)\nO PROBLEMA ACONTECE NO PERÍODO: MANHÃ ( ) TARDE ( ) NOITE ( )\nACONTECE EM TODOS OS CÔMODOS DA INSTALAÇÃO OU APENAS EM ALGUNS CÔMODOS?\nO CLIENTE ADQUIRIU ALGUM ELETRODOMÉSTICO OU EQUIPAMENTO ELÉTRICO RECENETEMENTE? SIM ( ) NÃO ( )\nO CLIENTE TEM CONHECIMENTO DE ALGUM COMÉRCIO, OFICINA OU INDÚSTRIA PRÓX. A SUA RESIDÊNCIA?\nMEIO DE COMUNICAÇÃO:\nPONTO DE REFERÊNCIA:\nCONTATO:'
      }
    ]
  },
  {
    id: 'fraude',
    name: 'Denúncia de Fraude',
    icon: <ShieldAlert className="w-5 h-5" />,
    templates: [
      {
        id: 'denuncia-fraude',
        title: 'Denúncia de Fraude',
        content: 'OBS: (A DENÚNCIA DEVE SER GERADA NA CONTA CONTRATO ESPECÍFICA DE DENUNCIA NO SAP - basta inserir no campo parceiro de negócio a palavra DENUNCIA; No AJURI usar o Código Único 019).\n\nCLIENTE ANÔNIMO DESCRIÇÃO DA DENUNCIA:\nINFORMA FRAUDE NO FORNECIMENTO DE ENERGIA ELÉTRICA.\nNOME DO RESPONSAVEL:\nRUA:xxx BAIRRO:xxx CIDADE:xxx\nPONTO DE REFERENCIA: xxx\nCOR DA CASA:xxxCASA MURADA: SIM/ NAO TEM MEDIDOR: SIM/ NAO TEM HORARIO ESPECIFICO PARA A FRAUDE: SIM/ NAO FAVOR VERIFICAR U55XXXXX'
      }
    ]
  },
  {
    id: 'reclamacao',
    name: 'Reclamação',
    icon: <MessageSquare className="w-5 h-5" />,
    templates: [
      {
        id: 'script-reclamacao',
        title: 'Script da Reclamação',
        content: 'Script da Reclamação:\n* DESCRIÇÃO DA RECLAMAÇÃO:\n* SOLUÇÃO PRETENDIDA:\n* ANÁLISE DO ATENDENTE:\n* MEIO DE RESPOSTA DA RECLAMAÇÃO: TELEFONE ( ) CARTA ( ) E-MAIL ( )\n* ACEITA RECEBER RESPOSTA / FATURA VIA WHATSAPP: SIM ( ) NÃO ( )\n* TELEFONE PARA CONTATO: (DDD) XXXXX\n* MELHOR HORÁRIO PARA CONTATO: MANHÃ ( ) TARDE ( )\n* E-MAIL: XXXX (quando o cliente não possui e-mail, sinalizar com o texto "não informado")\n* AUTORIZA TERCEIROS: SIM ( ) NÃO ( )\n* INFORMAÇÕES COMPLEMENTARES:'
      }
    ]
  },
  {
    id: 'manifesto-cliente',
    name: 'Manifesto do Cliente',
    icon: <Star className="w-5 h-5" />,
    templates: [
      {
        id: 'manifesto-agradecimento',
        title: 'Manifesto do Cliente',
        content: 'Cliente fez questão de agradecer pelo atendimento recebido na agência de <<nome da agência>>\npela Atendente: XXXXXXXXXXX\nCliente solicita resposta através do telefone: XXXXXXXXXXXX\nAnalisar o anexo do formulário de manifestação'
      }
    ]
  },
  {
    id: 'religacao',
    name: 'Religação',
    icon: <RotateCcw className="w-5 h-5" />,
    templates: [
      {
        id: 'religacao-comum',
        title: 'Religação',
        content: 'CLIENTE VEIO AO ATENDIMENTO E SOLICITA A RELIGACAO\nCLIENTE APRESENTOU COMPROVANTE DE PAGAMENTO DAS FATURAS VENCIDAS\nCLIENTE CIENTE DA TAXA DE 11,30 / 46,72 E PRAZO DE 24 / 48 HORAS\nPONTO DE REFERÊNCIA:\nCONTATO:'
      },
      {
        id: 'troca-com-religacao',
        title: 'Troca com Religação',
        content: 'CLIENTE VEIO ATE O ATENDIMENTO PORTANDO RG E CPF, O MESMO SOLICITA RELIGACAO COMUM NÃO HÁ DÉBITO EM ABERTO NESTA UNIDADE O MESMO ESTA CIENTE DO PRAZO E NAO IRA SER COBRADO PELA TAXA DE SERVICO.\nPONTO DE REFERENCIA:\nTELEFONE:'
      }
    ]
  },
  {
    id: 'servico-tecnico-rede',
    name: 'Serviço Técnico de Rede',
    icon: <MapPin className="w-5 h-5" />,
    templates: [
      {
        id: 'deslocamento-poste',
        title: 'Serviço Técnico de Rede',
        content: 'VEIO ATE O ATENDIMENTO PORTANDO RG E CPF E SOLICITA SERVICO TECNICO DE DESLOCAMENTO DE POSTE EM PROPRIEDADE PARTICULAR INFORMA QUE O POSTE DE REDE ESTA EM FRENTE A ENTRADA DE SUA RESIDENCIA ATRAPALHANDO O TRAFEGO CLIENTE CIENTE DE POSSIVEL PARTICIPACAO FINANCEIRA APOS VISTORIA NO LOCAL.\nPONTO DE REFERENCIA:\nTELEFONE:'
      }
    ]
  },
  {
    id: 'medidor',
    name: 'Medidor e Padrão',
    icon: <Gauge className="w-5 h-5" />,
    templates: [
      {
        id: 'problema-medidor',
        title: 'Problema com Medidor',
        content: 'VEIO AO ATENDIMENTO COM RG E CPF SOLICITAR VISITA TÉCNICA EM SEU IMÓVEL, POIS AFIRMA QUE SEU MEDIDOR ESTÁ APRESENTANDO DEFEITOS. COMO FORMA DE RESPALDO E PRECAVENDO-SE O MESMO ABRIU SOLICITAÇÃO PARA REGULARIZAÇÃO. APRESENTOU RG CPF E ESTÁ CIENTE DO PRAZO DE ATENDIMENTO.\nPONTO DE REFERÊNCIA:\nCONTATO:'
      },
      {
        id: 'afericao',
        title: 'Aferição por Órgão Metrológico',
        content: 'SOLICITADO O PEDIDO DE AFERIÇÃO POR ÓRGÃO METROLÓGICO, COM A DEVIDA\nANUÊNCIA DA SUPERVISÃO. CLIENTE XXX, TITULAR DA UC XXXX ESTÁ CIENTE DA TAXA\nDE COBRANÇA. O DOCUMENTO EM ANEXO FOI DEVIDAMENTE PREENCHIDO, DATADO E\nASSINADO.'
      },
      {
        id: 'mudanca-local',
        title: 'Mudança de Medidor de Local',
        content: 'PONTO DE REF: XXXXXXX\nCLIENTE SOLICITA MUDANÇA DE MEDIDOR DE LOCAL O MESMO INFORMA QUE JÁ REALIZOU INSTALAÇÃO DE UM NOVO PADRÃO CONFORME NORMAS PARA QUE POSSA SER ATENDIDO. CLIENTE CIENTE DO PRAZO DE 5 DIAS ÚTEIS\nTELEFONE:'
      },
      {
        id: 'troca-padrao-acrescimo',
        title: 'Troca de Padrão (Com/Sem Acréscimo)',
        content: 'PARA TROCA DE PADRÃO COM ACRESCIMO DE CARGA ( )\nSEM ACRESCIMO DE CARGA ( ) PONTO DE REF: EM FRENTE AO BRUCE CHAVEIRO TELEFONE:\nCLIENTE INFORMA QUE JÁ INSTALOU O PADRÃO CONVENCIONAL DE ACORDO COM AS NORMAS TÉCNICAS, INFORMA CABO DE 10MM E DISJUNOR DE 40A CLIENTE CIENTE DO PRAZO DE 5 DIAS UTEIS, E EM CASOS DE PENDENCIAS DE SUA RESPONSABILIDADE O PEDIDO PODERÁ SER REJEITADO.'
      },
      {
        id: 'troca-padrao-substituicao',
        title: 'Troca de Padrão (Substituição de Cabo)',
        content: 'SEM ACRÉSCIMO P/ SUBSTITUIÇÃO DE CABO-PERMANECENDO A FASE\n\nPONTO DE REF: XXXX\nTELEFONE: XXX\nCLIENTE COMPARECEU AO ATENDIMENTO SOLICITANDO TROCA DE PADRÃO SEM ACRÉSCIMO O MESMO PERMANECERÁ COM A MESMA FASE TRIFÁSICO, PORÉM DESEJA A SUSBTITUIÇÃO DO RAMAL DE 10MM PARA 25MM, COM DISJUNTOR DE 70A, CLIENTE INFORMA QUE JÁ REALIZOU AS DEVIDAS ADEQUAÇÕES CLIENTE CIENTE DE TODAS AS INFORMAÇÕES, INCLUSIVE QUE SE TIVER PENDENCIAS EM RELAÇÃO AO SEU PADRÃO O PEDIDO PODERÁ SER REJEITADO.'
      },
      {
        id: 'deslocamento-ramal',
        title: 'Deslocamento de Ramal',
        content: '**** VEIO AO ATENDIMENTO COM RG E CPF SOLICITAR O DESLOCAMENTO DE SEU RAMAL. AFIRMA QUE PONTALETE PADRÃO ESTÁ DEVIDAMENTE MONTADO NO LOCAL CORRETO E ESTÁ CIENTE DO PRAZO DE ATENDIMENTO DO SERVIÇO.\nPONTO DE REFERÊNCIA:\nCONTATO:'
      },
      {
        id: 'tarifa-branca',
        title: 'Tarifa Branca',
        content: 'CLIENTE SOLICITA O PEDIDO DE ALTERAÇÃO DA MODALIDADE TARIFARIA\nPARA (A TARIFA BRANCA / TARIFA CONVENCIONAL)\nDEMAIS INFORMAÇÕES FORMA SINALIZADAS CONFORME FORMULÁRIO\nASSINADO PELO CLIENTE EM ANEXO'
      }
    ]
  },
  {
    id: 'fatura',
    name: 'Fatura',
    icon: <CreditCard className="w-5 h-5" />,
    templates: [
      {
        id: 'segunda-via',
        title: 'Segunda Via',
        content: 'SR XXX (INFORMAR SE É TITULAR, PARENTE OU INQUILINO) RG XXXX CPF XXXXX SOLICITA A SEGUNDA VIA DA FATURA DO MÊS 01/2021 R$ 83,69'
      },
      {
        id: 'comunicado-adimplencia',
        title: 'Comunicado de Adimplência',
        content: '**** VEIO AO ATENDIMENTO PORTANDO RG E CPF E RG SOLICITAR COMUNICADO DE ADIMPLÊNCIA. EM ANALISE AO SISTEMA CLIENTE NÃO POSSUI DÉBITOS VENCIDOS, PORTANTO FOI PREENCHIDO O TERMO ASSIM COMO TAMBÉM ENTREGUE AO MESMO O DOCUMENTO PARA GARANTIA DE SEU DIREITO COMO CLIENTE ADIMPLENTE. FAVOR VERIFICAR DOCUMENTAÇÃO ASSINADA PELO CLIENTE ANEXADO AO CRM.'
      },
      {
        id: 'data-certa',
        title: 'Data Certa',
        content: '*** VEIO AO ATENDIMENTO PORTANDO RG E CPF SOLICITAR UMA DATA DE VENCIMENTO CERTA PARA SUA CONTA. FORAM DISPONIBILIZADOS DATAS PARA A SUA ESCOLHA E CLIENTE CONCORDOU COM A DATA CERTA ***. CIENTE QUE SÓ PODERÁ ALTERAR NOVAMENTE APÓS 12 MESES.'
      },
      {
        id: 'fatura-email',
        title: 'Fatura por E-mail',
        content: 'PARA FATURAS VIA EMAIL : A PEDIDO DO CLIENTE, EFETUOU-SE O CADASTRO PARA O ENVIO DA FATURA VIA E-MAIL E CONFIRMOU-SE O EMAIL XXXX@GMAIL.COM QUE RECEBERÁ A FATURA DIGITAL'
      },
      {
        id: 'fatura-whatsapp',
        title: 'Fatura por WhatsApp',
        content: 'PARA FATURAS VIA WHATSAPP: A PEDIDO DO CLIENTE, EFETUOU-SE O CADASTRO PARA O ENVIO DA FATURA VIA WHATSAPP E CONFIRMOU-SE O CONTATO TELEFÔNICO (99) 99999-9999 QUE RECEBERÁ A FATURA DIGITAL'
      },
      {
        id: 'cancelamento-convenio',
        title: 'Cancelamento de Convênio',
        content: '*** VEIO AO ATENDIMENTO PORTANDO RG E CPF SOLICITAR CANCELAMENTO DO CONVÊNIO *** NO VALOR DE R$ ** POIS DESCONHECE A COBRANÇA / NÃO TEM MAIS INTERESSE NO SERVIÇO. FAVOR SOLICITAR CANCELAMENTO CONFORME SOLICITAÇÃO DO CLIENTE.'
      }
    ]
  },
  {
    id: 'baixa-renda',
    name: 'Baixa Renda',
    icon: <Activity className="w-5 h-5" />,
    templates: [
      {
        id: 'inativacao-nis',
        title: 'Inativação de NIS',
        content: '*** VEIO AO ATENDIMENTO PORTANDO RG, CPF E NIS E SOLICITA INATIVAÇÃO NA INSTALAÇÃO *** POIS AFIRMA QUE NÃO TEM MAIS VINCULO COM O IMOVEL. FAVOR INATIVAR NIS CONFORME SOLICITAÇÃO DO CLIENTE.\nRG:\nCPF:\nNIS:\nDATA NASCIMENTO:\nCODIGO FAMILIAR:\nCONTATO:\nDATA DA ULTIMA ATUALIZAÇÃO:\nCLIENTE CIENTE DO PRAZO DE 5 DIAS UTEIS.'
      },
      {
        id: 'analise-cadastro',
        title: 'Análise de Cadastro',
        content: 'CLIENTE MARIA DA SILVA SOLICITA CADASTRO BAIXA RENDA\nNOME TITULAR DO NIS:\nNIS:\nCÓD. FAMILIAR:\nCPF:\nRG:\nNOME DA MÃE:\nDATA DA ULTIMA ATUALIZAÇÃO:\nCLIENTE CIENTE DO PRAZO DE 5 DIAS UTEIS.'
      },
      {
        id: 'analise-pos-inativacao',
        title: 'Análise após Inativação',
        content: '*** VEIO AO ATENDIMENTO PORTANDO RG, CPF E NIS E SOLICITA ANÁLISE CADASTRO BAIXA RENDA. SEGUE PRINT DE ERRO DE CADASTRO NO ATENDIMENTO, PARA CADASTRAMENTO NO SISTEMA. SEGUE EM ANEXO FOLHA RESUMO, RG E CPF. PRINTS DE TELAS DO SOMOS E EXCLUSAO DA ANTIGA INSTALAÇÃO. FAVOR REALIZAR CADASTRO DO CLIENTE BAIXA RENDA.\nINSTALAÇÃO:\nCONTA CONTRATO:\nTITULAR DO NIS:\nDATA NASCIMENTO:\nRG:\nCPF:\nNIS:\nCÓDIGO FAMILIAR:\nCONTATO:'
      }
    ]
  },
  {
    id: 'emergencial',
    name: 'Serviço Emergencial',
    icon: <AlertTriangle className="w-5 h-5" />,
    templates: [
      {
        id: 'falta-energia-individual',
        title: 'Falta de Energia Individual',
        content: '#AG# ***** VEIO AO ATENDIMENTO COM RG E CPF INFORMAR FALTA DE ENERGIA AFETANDO SOMENTE SUA CASA, CLIENTE INFORMA QUE JÁ REALIZOU O TESTE NO DISJUNTOR E NÃO OBTEVE RESULTADOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'falta-energia-geral',
        title: 'Falta de Energia Geral',
        content: '#AG# *** VEIO AO ATENDIMENTO COM RG E CPF INFORMAR FALTA DE ENERGIA AFETANDO SUA CASA E OUTRAS RESIDÊNCIAS DA LOCALIDADE CLIENTE INFORMA QUE JÁ REALIZOU O TESTE NO DISJUNTOR E NÃO OBTEVE RESULTADOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'choque-vazamento',
        title: 'Choque e Vazamento',
        content: '#AG# **** VEIO AO ATENDIMENTO INFORMAR CHOQUE E VAZAMENTO DE ENERGIA, FAVOR EQUIPE REGULARIZAR A SITUAÇÃO NEUTRALIZANDO RISCOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'ramal-partido',
        title: 'Rede ou Ramal Partido',
        content: '#AG# **** VEIO AO ATENDIMENTO INFORMA QUE CABO PARTIDO, FAVOR EQUIPE REGULARIZAR A SITUAÇÃO NEUTRALIZANDO RISCOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'falta-fase',
        title: 'Falta de Fase',
        content: '#AG# *** VEIO AO ATENDIMENTO INFORMAR FALTA DE FASE, O MESMO SOLICITA AVALIAÇÃO E A NORMALIZAÇÃO DO SEU FORNECIMENTO DE ENERGIA.\nPONTO DE REFERENCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'avaliacao-tecnica',
        title: 'Avaliação Técnica',
        content: '#AG# **** VEIO AO ATENDIMENTO INFORMAR QUE ESTÁ COM OSCILAÇÕES FREQUENTES, A MENOS DE 7 DIAS, INFORMA QUE O HORÁRIO EM QUE MAIS TEM OSCILAÇÕES É NA PARTE DA XXXXXXX E O HORÁRIO MAIS FREQUENTE É XXXX\nPONTO DE REFERENCIA:\nTELEFONE PARA CONTATO:'
      }
    ]
  },
  {
    id: 'devolucao',
    name: 'Devolução de Crédito',
    icon: <RotateCcw className="w-5 h-5" />,
    templates: [
      {
        id: 'devolucao-credito',
        title: 'Devolução de Crédito',
        content: '**** VEIO AO ATENDIMENTO PORTANDO RG E CPF SOLICITAR DEVOLUÇÃO DE CREDITO, POIS EFETUOU O PAGAMENTO EM DUPLICIDADE DA FATURA DO MÊS XX/XXXX VALOR DE R$ XXXX. CLIENTE SOLICITA QUE A DEVOLUÇÃO SEJA FEITA ( ) NAS FATURAS EM ABERTO ( ) NA SUA CONTA BANCÁRIA, EM ANEXO NA NOTA DOCUMENTOS DO CLIENTE E COMPROVANTE DE PAGAMENTO.\nCONTA:\nAGÊNCIA:\nRG:\nCPF:\nNOME COMPLETO DO TITULAR DO CARTÃO:'
      }
    ]
  },
  {
    id: 'debito-automatico',
    name: 'Débito Automático',
    icon: <History className="w-5 h-5" />,
    templates: [
      {
        id: 'cadastro-debito',
        title: 'Cadastro de Débito Automático',
        content: 'CADASTRO DE DÉBITO AUTOMÁTICO SOLICITADO PELO TITULAR DA CONTA BANCÁRIA SR. XXXXXXXXXXX\nO MESMO APRESENTOU RG, CPF, COMPROVANTE DA CONTA BANCÁRIA E ASSINATURA DO TERMO DE ADESÃO. CLIENTE CIENTE DO PRAZO DE ATÉ 2 DIAS ÚTEIS PARA VALIDAÇÃO E CLIENTE QUE CASO SEJA O TITULAR DO BB DEVERÁ CONFIRMAR A ADESÃO VIA SMS ENVIADO PELO BANCO.\nCONTA:\nAGÊNCIA:\nRG:\nCPF:\nBANCO:'
      }
    ]
  }
];

const NegotiationTable = () => {
  const categories = [
    {
      title: 'CATEGORIA 1',
      subtitle: 'CLASSES: Comercial, Industrial e Residencial (com consumo médio* maior que 300kWh).',
      profiles: [
        {
          id: 1,
          name: 'Atendente, Equipe GSRD ou GERE, Agente de Cobrança e Central de Atendimento ao Cliente',
          rows: [
            { qty: '3 a 5', entry: '50%', maxInstallments: 'Até 6X', maxDebt: 'Até R$20MIL' },
            { qty: '6 a 10', entry: '50%', maxInstallments: 'Até 6X', maxDebt: 'Até R$20MIL' },
            { qty: 'Acima de 10', entry: '50%', maxInstallments: 'Até 6X', maxDebt: 'Até R$20MIL' },
          ]
        },
        {
          id: 2,
          name: 'Supervisor de Agência, Supervisor Comercial, Central de Apoio ao Atendimento Presencial, Assistentes e Analistas da cobrança',
          rows: [
            { qty: '3 a 5', entry: '40%', maxInstallments: 'Até 18X', maxDebt: 'Até R$30MIL' },
            { qty: '6 a 10', entry: '40%', maxInstallments: 'Até 24X', maxDebt: 'Até R$30MIL' },
            { qty: 'Acima de 10', entry: '40%', maxInstallments: 'Até 30X', maxDebt: 'Até R$30MIL' },
          ]
        },
        {
          id: 3,
          name: 'Executivo, Líderes da Cobrança, Coordenador Atendimento e Coordenador Comercial',
          rows: [{ qty: 'A partir de 2', entry: '0%', maxInstallments: '60X', maxDebt: 'Até R$100MIL' }]
        },
        {
          id: 4,
          name: 'Gerente Equatorial',
          rows: [{ qty: 'A partir de 1', entry: '0%', maxInstallments: '80X', maxDebt: 'Até R$200MIL' }]
        },
        {
          id: 5,
          name: 'Diretor Equatorial',
          rows: [{ qty: 'A partir de 1', entry: '0%', maxInstallments: 'Ilimitado', maxDebt: 'Ilimitado' }]
        }
      ]
    },
    {
      title: 'CATEGORIA 2',
      subtitle: 'CLASSES: Residencial (com consumo médio* menor que 300kWh) e Rural.',
      profiles: [
        {
          id: 1,
          name: 'Atendente, Equipe GSRD ou GERE...',
          rows: [
            { qty: '3 a 5', entry: '30%', maxInstallments: 'Até 12X', maxDebt: 'Até R$20MIL' },
            { qty: '6 a 10', entry: '25%', maxInstallments: 'Até 18X', maxDebt: 'Até R$20MIL' },
            { qty: 'Acima de 10', entry: '20%', maxInstallments: 'Até 18X', maxDebt: 'Até R$20MIL' },
          ]
        },
        {
          id: 2,
          name: 'Supervisor de Agência...',
          rows: [
            { qty: '3 a 5', entry: '25%', maxInstallments: 'Até 18X', maxDebt: 'Até R$30MIL' },
            { qty: '6 a 10', entry: '20%', maxInstallments: 'Até 24X', maxDebt: 'Até R$30MIL' },
            { qty: 'Acima de 10', entry: '15%', maxInstallments: 'Até 30X', maxDebt: 'Até R$30MIL' },
          ]
        },
        {
          id: 3,
          name: 'Executivo...',
          rows: [{ qty: 'A partir de 2', entry: '0%', maxInstallments: '60X', maxDebt: 'Até R$100MIL' }]
        },
        {
          id: 4,
          name: 'Gerente Equatorial',
          rows: [{ qty: 'A partir de 1', entry: '0%', maxInstallments: '80X', maxDebt: 'Até R$200MIL' }]
        },
        {
          id: 5,
          name: 'Diretor Equatorial',
          rows: [{ qty: 'A partir de 1', entry: '0%', maxInstallments: 'Ilimitado', maxDebt: 'Ilimitado' }]
        }
      ]
    },
    {
      title: 'CATEGORIA 3',
      subtitle: 'CLASSES: Residencial Baixa Renda**',
      profiles: [
        {
          id: 1,
          name: 'Atendente, Equipe GSRD ou GERE...',
          rows: [
            { qty: '3 a 5', entry: '20%', maxInstallments: 'Até 12X', maxDebt: 'Até R$20MIL' },
            { qty: '6 a 10', entry: '15%', maxInstallments: 'Até 18X', maxDebt: 'Até R$20MIL' },
            { qty: 'Acima de 10', entry: '15%', maxInstallments: 'Até 18X', maxDebt: 'Até R$20MIL' },
          ]
        },
        {
          id: 2,
          name: 'Supervisor de Agência...',
          rows: [
            { qty: '3 a 5', entry: '10%', maxInstallments: 'Até 18X', maxDebt: 'Até R$30MIL' },
            { qty: '6 a 10', entry: '10%', maxInstallments: 'Até 24X', maxDebt: 'Até R$30MIL' },
            { qty: 'Acima de 10', entry: '10%', maxInstallments: 'Até 30X', maxDebt: 'Até R$30MIL' },
          ]
        },
        {
          id: 3,
          name: 'Executivo...',
          rows: [{ qty: 'A partir de 1', entry: '0%', maxInstallments: '60X', maxDebt: 'Até R$100MIL' }]
        },
        {
          id: 4,
          name: 'Gerente Equatorial',
          rows: [{ qty: 'A partir de 1', entry: '0%', maxInstallments: '80X', maxDebt: 'Até R$200MIL' }]
        },
        {
          id: 5,
          name: 'Diretor Equatorial',
          rows: [{ qty: 'A partir de 1', entry: '0%', maxInstallments: 'Ilimitado', maxDebt: 'Ilimitado' }]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-5 h-5 text-green-600 dark:text-yellow-400" />
        <h3 className="text-base font-black text-slate-800 dark:text-yellow-50">Tabela de Parâmetros de Negociação</h3>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white dark:bg-[#0b1120] rounded-xl border border-slate-200/60 dark:border-yellow-400/30 overflow-hidden shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-colors duration-500">
            <div className="bg-green-600 dark:bg-green-900/30 p-3 text-center border-b border-transparent dark:border-yellow-400/20">
              <h4 className="text-white dark:text-yellow-400 font-black text-lg tracking-wider">{cat.title}</h4>
              <p className="text-green-100 dark:text-yellow-500 text-[10px] mt-0.5 font-mono">{cat.subtitle}</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800/50">
                    <th className="p-2 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border-r border-slate-200 dark:border-slate-800/50">Perfil</th>
                    <th className="p-2 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border-r border-slate-200 dark:border-slate-800/50">Qtd Faturas</th>
                    <th className="p-2 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center" colSpan={3}>Parâmetros</th>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-800/50">
                    <th className="p-1.5 border-r border-slate-200 dark:border-slate-800/50"></th>
                    <th className="p-1.5 border-r border-slate-200 dark:border-slate-800/50"></th>
                    <th className="p-1.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase text-center border-r border-slate-200 dark:border-slate-800/50">Entrada Mínima</th>
                    <th className="p-1.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase text-center border-r border-slate-200 dark:border-slate-800/50">Nº Máx Parcelas</th>
                    <th className="p-1.5 text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase text-center">Dívida Máxima</th>
                  </tr>
                </thead>
                <tbody>
                  {cat.profiles.map((profile) => (
                    <React.Fragment key={profile.id}>
                      {profile.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                          {rowIdx === 0 && (
                            <td className="p-2 text-[10px] font-bold text-slate-700 dark:text-slate-300 border-r border-slate-200 dark:border-green-900/30 bg-slate-50/30 dark:bg-green-900/10" rowSpan={profile.rows.length}>
                              <div className="flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-yellow-400 flex items-center justify-center text-[9px] shrink-0 border border-green-200/50 dark:border-yellow-400/50">{profile.id}</span>
                                <span className="leading-tight">{profile.name}</span>
                              </div>
                            </td>
                          )}
                          <td className="p-2 text-[10px] font-medium text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-green-900/30 text-center">{row.qty}</td>
                          <td className="p-2 text-[10px] font-bold text-green-600 dark:text-yellow-400 text-center border-r border-slate-200 dark:border-green-900/30">{row.entry}</td>
                          <td className="p-2 text-[10px] font-bold text-slate-700 dark:text-slate-200 text-center border-r border-slate-200 dark:border-green-900/30">{row.maxInstallments}</td>
                          <td className="p-2 text-[10px] font-bold text-green-600 dark:text-yellow-400 text-center">{row.maxDebt}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TemplateGenerator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copyErrorId, setCopyErrorId] = useState<string | null>(null);
  const [expandedTemplates, setExpandedTemplates] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [pinnedCategories, setPinnedCategories] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const toggleExpanded = (id: string) => {
    setExpandedTemplates(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  // Load theme and favorites from localStorage on mount
  useEffect(() => {
    const initData = () => {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }

      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (e) {
          console.error('Error parsing favorites', e);
        }
      }

      const savedPinned = localStorage.getItem('pinnedCategories');
      if (savedPinned) {
        try {
          setPinnedCategories(JSON.parse(savedPinned));
        } catch (e) {
          console.error('Error parsing pinned categories', e);
        }
      }
      setMounted(true);
    };
    
    // Defer state updates to avoid linter warning and cascading renders
    const timer = setTimeout(initData, 0);
    return () => clearTimeout(timer);
  }, []);

  // Update localStorage when favorites change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites, mounted]);

  // Update localStorage when pinned categories change
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('pinnedCategories', JSON.stringify(pinnedCategories));
  }, [pinnedCategories, mounted]);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Close sidebar on category selection (mobile)
  const handleCategorySelect = (id: string | null) => {
    setSelectedCategory(id);
    setIsSidebarOpen(false);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPinnedCategories(prev => 
      prev.includes(id) ? prev.filter(pinnedId => pinnedId !== id) : [...prev, id]
    );
  };

  const filteredCategories = useMemo(() => {
    // Return raw templates if not mounted to avoid hydration mismatch with dates
    if (!mounted) return SERVICE_CATEGORIES;

    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    const processTemplates = (templates: Template[]) => 
      templates.map(t => ({
        ...t,
        content: t.content.replace(/00\/00\/0000/g, currentDate)
      }));

    if (selectedCategory === 'favorites') {
      const allTemplates = SERVICE_CATEGORIES.flatMap(cat => cat.templates);
      const favoriteTemplates = allTemplates.filter(t => favorites.includes(t.id));
      
      return [{
        id: 'favorites',
        name: 'Meus Favoritos',
        icon: <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />,
        templates: processTemplates(favoriteTemplates).filter(template => 
          !searchQuery || 
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      } as Category].filter(cat => cat.templates.length > 0);
    }

    const categories = SERVICE_CATEGORIES.map(cat => ({
      ...cat,
      templates: processTemplates(cat.templates)
    }));

    if (!searchQuery) return categories;

    return categories.map(category => ({
      ...category,
      templates: category.templates.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.templates.length > 0);
  }, [searchQuery, favorites, selectedCategory, mounted]);

  const handleCopy = async (text: string, id: string) => {
    let success = false;
    setCopyErrorId(null);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      } else {
        // Fallback for non-secure contexts or older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          success = document.execCommand('copy');
          textArea.remove();
        } catch (err) {
          console.error('Fallback copy failed', err);
          textArea.remove();
        }
      }
      
      if (success) {
        setCopiedId(id);
        setToast({ message: 'Texto copiado para a área de transferência', type: 'success' });
        setTimeout(() => setCopiedId(null), 2000);
        setTimeout(() => setToast(null), 3000);
      } else {
        setCopyErrorId(id);
        setToast({ message: 'Erro ao copiar texto.', type: 'error' });
        setTimeout(() => setCopyErrorId(null), 3000);
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopyErrorId(id);
      setToast({ message: 'Erro ao copiar texto.', type: 'error' });
      setTimeout(() => setCopyErrorId(null), 3000);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-blue-500 dark:from-green-900 dark:via-yellow-800 dark:to-blue-900 text-slate-900 dark:text-yellow-50 font-sans selection:bg-green-200/50 dark:selection:bg-green-600/30 flex overflow-hidden transition-colors duration-500 relative">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-overlay">
        <img src="https://images.vexels.com/media/users/3/152348/isolated/preview/e292f8cec7eae5f8f4f25bcc36cfe5f5-logo-da-selecao-brasileira-de-futebol.png" alt="Brazil CBF Logo" className="w-[120vw] md:w-[70vw] object-cover sm:object-contain drop-shadow-2xl blur-[2px]" />
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-blue-500 opacity-30 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] rounded-full bg-yellow-500 opacity-20 blur-[150px] animate-pulse-slow"></div>
      </div>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] border backdrop-blur-xl"
            style={{
              backgroundColor: toast.type === 'success' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              borderColor: toast.type === 'success' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(239, 68, 68, 0.5)',
              color: toast.type === 'success' ? '#22c55e' : '#ef4444',
              boxShadow: toast.type === 'success' ? '0 0 20px rgba(6, 182, 212, 0.2)' : '0 0 20px rgba(239, 68, 68, 0.2)'
            }}
          >
            {toast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            <span className="text-sm font-bold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-green-900/30 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col h-full shadow-[4px_0_24px_-10px_rgba(34,197,94,0.1)] dark:shadow-[4px_0_24px_-10px_rgba(34,197,94,0.05)]",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full relative z-10">
          <div className="p-6 border-b border-slate-200/50 dark:border-green-900/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center text-yellow-500 bg-green-600/10 border border-yellow-400/20 rounded-lg shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-800 dark:text-yellow-50">SISTEMA <span className="text-yellow-500">LESTE</span></span>
            </div>
            <Tooltip text="Fechar Menu" position="left">
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-green-200 dark:scrollbar-thumb-green-900/50 scrollbar-track-transparent">
            <button
              onClick={() => handleCategorySelect(null)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-transparent",
                selectedCategory === null 
                  ? "bg-green-50 dark:bg-green-600/10 text-green-600 dark:text-yellow-400 dark:border-yellow-400/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-green-900/20 hover:text-slate-700 dark:hover:text-yellow-200 dark:hover:border-yellow-400/20"
              )}
            >
              <FileText className="w-4 h-4" />
              Todos os Serviços
            </button>

            <button
              onClick={() => handleCategorySelect('favorites')}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-transparent",
                selectedCategory === 'favorites' 
                  ? "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 dark:border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-green-900/20 hover:text-slate-700 dark:hover:text-yellow-200 dark:hover:border-yellow-400/20"
              )}
            >
              <Heart className={cn("w-4 h-4", selectedCategory === 'favorites' && "fill-current")} />
              Meus Favoritos
            </button>
            
            <div className="pt-4 pb-2 px-4">
              <span className="text-[10px] font-black text-slate-400 dark:text-green-600 uppercase tracking-[0.2em]">Serviços</span>
            </div>

            {[...SERVICE_CATEGORIES].sort((a, b) => {
              const aPinned = pinnedCategories.includes(a.id);
              const bPinned = pinnedCategories.includes(b.id);
              if (aPinned && !bPinned) return -1;
              if (!aPinned && bPinned) return 1;
              return 0;
            }).map((cat) => (
              <div key={cat.id} className="relative group">
                <button
                  onClick={() => handleCategorySelect(cat.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all border border-transparent",
                    selectedCategory === cat.id 
                      ? "bg-green-50 dark:bg-green-600/10 text-green-600 dark:text-yellow-400 dark:border-yellow-400/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-green-900/20 hover:text-slate-700 dark:hover:text-yellow-200 dark:hover:border-yellow-400/20"
                  )}
                >
                  <div className={cn(
                    "p-1.5 rounded-lg transition-colors border",
                    selectedCategory === cat.id 
                      ? "bg-white dark:bg-green-600/20 border-green-100 dark:border-yellow-400/30 text-green-600 dark:text-yellow-300" 
                      : "bg-slate-100 dark:bg-slate-800/50 border-transparent dark:border-slate-800/80 text-slate-500 dark:text-slate-400 group-hover:text-yellow-500"
                  )}>
                    {cat.icon}
                  </div>
                <span className="flex-1 text-left truncate pr-6">{cat.name}</span>
                </button>
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                  <Tooltip text={pinnedCategories.includes(cat.id) ? "Desafixar categoria" : "Fixar categoria no topo"} position="left">
                    <button
                      onClick={(e) => togglePin(cat.id, e)}
                      className={cn(
                        "p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-green-900/50",
                        pinnedCategories.includes(cat.id) && "opacity-100 text-yellow-500 dark:text-yellow-400"
                      )}
                    >
                      <Pin className={cn("w-3.5 h-3.5", pinnedCategories.includes(cat.id) && "fill-current")} />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-200/50 dark:border-green-900/30 shrink-0 relative">
            <div className="bg-green-50 dark:bg-green-900/10 border border-transparent dark:border-yellow-400/20 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-yellow-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-700 dark:text-yellow-300 uppercase tracking-widest">Status do Sistema</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                &gt; Módulos ativos.<br />
                &gt; Banco de dados sincronizado.<br />
                &gt; Prontos para uso.
              </p>
            </div>
            <div className="text-center py-2 border-t border-slate-200/50 dark:border-green-900/30">
              <p className="text-[9px] font-mono text-slate-400 dark:text-green-700/70 uppercase tracking-widest">
                SYS.DEV // <a href="https://github.com/Rahonne08" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 dark:hover:text-yellow-400 transition-colors underline underline-offset-2">PABLO RAHONNE</a>
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/60 dark:bg-[#020617]/60 backdrop-blur-xl border-b border-slate-200/50 dark:border-green-900/30 transition-colors duration-500">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Tooltip text="Abrir Menu" position="right">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-slate-500 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-green-900/30 border border-transparent dark:border-green-800/50 rounded-lg"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </Tooltip>
              
              <div className="relative flex-1 min-w-[300px] max-w-8xl group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-yellow-500 transition-colors" />
                <input 
                  type="text"
                  placeholder="CONSULTAR BASE DE DADOS..."
                  className="w-full pl-12 pr-4 py-2.5 bg-white/80 dark:bg-[#0b1120]/80 backdrop-blur-sm border border-slate-200/80 dark:border-green-800/50 focus:bg-white dark:focus:bg-[#0b1120] focus:ring-1 focus:ring-green-500 focus:border-yellow-400 rounded-lg text-sm font-mono tracking-wide transition-all outline-none dark:text-yellow-50 shadow-sm dark:shadow-[0_0_10px_rgba(34,197,94,0.05)] placeholder-slate-400 dark:placeholder-green-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Tooltip text={theme === 'light' ? 'Ativar Modo Noturno' : 'Ativar Modo Claro'} position="bottom">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-lg bg-white dark:bg-[#0b1120] border border-slate-200/80 dark:border-green-800/50 text-slate-500 dark:text-yellow-400 hover:bg-slate-50 dark:hover:bg-green-900/20 shadow-sm transition-all"
                >
                  {theme === 'light' ? (
                    <Zap className="w-5 h-5" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                  )}
                </button>
              </Tooltip>

              <div className="hidden sm:flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-800 dark:text-yellow-400 tracking-[0.2em]">REDE LESTE</span>
                  <span className="text-[9px] text-slate-400 dark:text-green-700 font-mono tracking-widest flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div> ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-10 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 transition-colors duration-500 relative z-10">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <h2 className="text-lg font-bold text-amber-800 dark:text-amber-200 uppercase tracking-tight">REGISTROS DE ATENDIMENTO APRENDE +</h2>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold text-amber-900 dark:text-amber-100 italic">ATENÇÃO:</p>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-300">CARGA DECLARADA INCOMPLETA:</p>
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                LIGAÇÕES NOVAS/REATIVAÇÕES PRECISAM CONSTAR NO SAP CRM COM UMA DECLARAÇÃO REAL DOS EQUIPAMENTOS QUE O CLIENTE FAZ OU FARÁ USO, PORTANTO SERÁ CONSIDERADO COMO INCOMPLETO OS CASOS EM QUE FOR DECLARADA EX: APENAS LÂMPADAS.
              </p>
            </div>
          </div>
          <AnimatePresence mode="popLayout">
            {filteredCategories
              .filter(cat => !selectedCategory || cat.id === selectedCategory)
              .map((category) => (
                <motion.section 
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-[#0b1120] rounded-xl flex items-center justify-center text-yellow-500 dark:text-yellow-400 shadow-[0_0_15px_rgba(34,197,94,0.1)] border border-slate-200/60 dark:border-yellow-400/30 transition-colors duration-500">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 dark:text-yellow-50 tracking-tight">{category.name}</h2>
                      <p className="text-sm font-mono text-slate-500 dark:text-green-600/80">{category.templates.length} templates carregados</p>
                    </div>
                  </div>

                  {category.info && (
                    <div className="bg-green-50/80 dark:bg-green-900/10 border border-green-100 dark:border-yellow-400/20 rounded-xl p-5 flex flex-col gap-4 shadow-sm dark:shadow-[0_0_10px_rgba(34,197,94,0.05)]">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-green-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                        <p className="text-sm text-green-900 dark:text-green-100 leading-relaxed font-mono">
                          {category.info}
                        </p>
                      </div>
                      {category.info.includes('naoinformado@equatorialenergia.com.br') && (
                        <div className="flex flex-col items-end gap-2">
                          <Tooltip text={copiedId === 'email-copy' ? "Email Copiado!" : copyErrorId === 'email-copy' ? "Erro ao Copiar" : "Copiar endereço de email"}>
                            <button
                              onClick={() => handleCopy('naoinformado@equatorialenergia.com.br', 'email-copy')}
                              className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] border w-fit font-mono",
                                copyErrorId === 'email-copy' 
                                  ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50" 
                                  : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-yellow-300 border-green-200 dark:border-yellow-400/30 hover:bg-green-200 dark:hover:bg-green-800/60 dark:hover:border-yellow-400/50"
                              )}
                            >
                              {copiedId === 'email-copy' ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  Email Copiado!
                                </>
                              ) : copyErrorId === 'email-copy' ? (
                                <>
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  Erro ao Copiar
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  Copiar Email
                                </>
                              )}
                            </button>
                          </Tooltip>
                          {category.info.includes('Carta de Deferimento assinada_UC XXXX') && (
                            <Tooltip text={copiedId === 'title-copy' ? "Título Copiado!" : copyErrorId === 'title-copy' ? "Erro ao Copiar" : "Copiar título da carta"}>
                              <button
                                onClick={() => handleCopy('Carta de Deferimento assinada_UC XXXX', 'title-copy')}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] border w-fit font-mono",
                                  copyErrorId === 'title-copy' 
                                    ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/50" 
                                    : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-yellow-300 border-green-200 dark:border-yellow-400/30 hover:bg-green-200 dark:hover:bg-green-800/60 dark:hover:border-yellow-400/50"
                                )}
                              >
                                {copiedId === 'title-copy' ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    Título Copiado!
                                  </>
                                ) : copyErrorId === 'title-copy' ? (
                                  <>
                                    <AlertTriangle className="w-3.5 h-3.5" />
                                    Erro ao Copiar
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    Copiar Título da Carta
                                  </>
                                )}
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      )}
                    </div>
                  )}


                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {category.templates.map((template) => (
                      <motion.div
                        key={template.id}
                        layoutId={template.id}
                        className="group bg-white/70 dark:bg-[#0b1120]/70 backdrop-blur-xl border border-slate-200/60 dark:border-yellow-400/30 rounded-2xl p-6 hover:bg-white dark:hover:bg-[#0f172a] hover:border-yellow-400/50 dark:hover:border-yellow-400/80 hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)] dark:hover:shadow-[0_8px_30px_rgba(34,197,94,0.2)] transition-all duration-300 flex flex-col relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 dark:bg-green-600/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-green-600/20 transition-colors duration-500"></div>
                        <div className="flex items-start justify-between mb-6 relative z-10">
                          <div className="space-y-1">
                            <h3 
                              onClick={() => toggleExpanded(template.id)}
                              className="cursor-pointer font-bold text-slate-800 dark:text-yellow-50 leading-tight group-hover:text-green-600 dark:group-hover:text-yellow-400 transition-colors"
                            >
                              {template.title}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-400 dark:text-green-700 uppercase tracking-widest block mt-1">SYS.ID: {template.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Tooltip text={favorites.includes(template.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}>
                              <button
                                onClick={(e) => toggleFavorite(template.id, e)}
                                className={cn(
                                  "p-3 rounded-full transition-all shadow-sm",
                                  favorites.includes(template.id)
                                    ? "bg-rose-50 dark:bg-rose-900/30 text-rose-500 border border-rose-100 dark:border-rose-900/50"
                                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-900/50"
                                )}
                              >
                                <Heart className={cn("w-5 h-5", favorites.includes(template.id) && "fill-current")} />
                              </button>
                            </Tooltip>
                            <Tooltip text={copiedId === template.id ? "Copiado!" : copyErrorId === template.id ? "Erro ao Copiar" : "Copiar Template"}>
                              <button
                                onClick={() => handleCopy(template.content, template.id)}
                                className={cn(
                                  "shrink-0 p-3 rounded-full transition-all shadow-sm border",
                                  copiedId === template.id 
                                    ? "bg-green-600 border-yellow-400 text-white scale-110" 
                                    : copyErrorId === template.id
                                      ? "bg-rose-500 border-rose-500 text-white scale-110"
                                      : "bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-yellow-400/30 text-slate-400 dark:text-green-600/70 group-hover:bg-green-600 dark:group-hover:bg-green-600/20 group-hover:border-yellow-400 dark:group-hover:border-yellow-400 group-hover:text-white dark:group-hover:text-yellow-50"
                                )}
                              >
                                {copiedId === template.id ? <Check className="w-5 h-5" /> : copyErrorId === template.id ? <AlertTriangle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {expandedTemplates.includes(template.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="relative flex-1 group/pre mt-4">
                                <div className="absolute top-3 right-3 opacity-0 group-hover/pre:opacity-100 transition-opacity">
                                  <div className="bg-white/80 dark:bg-green-950/80 backdrop-blur px-2 py-1 rounded-md text-[10px] font-black text-slate-500 dark:text-yellow-400 border border-slate-200/50 dark:border-yellow-400/30 shadow-sm tracking-wide">
                                    CONTEÚDO DO TERMINAL
                                  </div>
                                </div>
                                <pre className="text-[11px] text-slate-600 dark:text-yellow-300 bg-slate-50 dark:bg-[#060b13] p-5 rounded-xl font-mono whitespace-pre-wrap leading-relaxed border border-slate-200/60 dark:border-yellow-400/30 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-green-200 dark:scrollbar-thumb-green-800 shadow-inner transition-colors duration-500 relative">
                                  {template.content}
                                </pre>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-yellow-400/20 flex items-center justify-between">
                          <div className="flex -space-x-2 opacity-50">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-green-950 border-2 border-white dark:border-green-900" />
                            ))}
                          </div>
                          <Tooltip text={copiedId === template.id ? "Copiado!" : copyErrorId === template.id ? "Erro ao Copiar" : "Copiar todo o conteúdo do template"}>
                            <button 
                              onClick={() => handleCopy(template.content, template.id)}
                              className="text-xs font-black text-green-600 dark:text-yellow-400 flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-widest"
                            >
                              Copiar Terminal
                              <ChevronRight className="w-4 h-4 text-yellow-500" />
                            </button>
                          </Tooltip>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {category.showNegotiationTable && <NegotiationTable />}
                </motion.section>
              ))}
          </AnimatePresence>

          {filteredCategories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center relative">
              <div className="absolute inset-0 bg-green-600/5 dark:bg-green-600/10 blur-[100px] rounded-full w-64 h-64 mx-auto -z-10" />
              <div className="w-24 h-24 bg-white dark:bg-[#0b1120] rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.1)] border border-slate-200 dark:border-yellow-400/30 flex items-center justify-center text-slate-400 dark:text-green-600 mb-6 transition-colors duration-500">
                <Search className="w-10 h-10 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-yellow-50 uppercase tracking-widest">Nenhum registro encontrado</h3>
              <p className="text-slate-500 dark:text-green-700/70 max-w-sm mt-3 font-mono text-sm leading-relaxed">SISTEMA: Não encontramos referências no banco de dados sobre &quot;{searchQuery}&quot;. Tente recalibrar os parâmetros de busca.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-8 px-8 py-3.5 bg-green-600 dark:bg-green-500 text-yellow-500 rounded-lg font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-yellow-500 transition-all hover:scale-105 active:scale-95 border border-yellow-400"
              >
                Resetar Parâmetros
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {copiedId && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.9 }}
            className="fixed bottom-10 left-1/2 z-[100] bg-slate-900 dark:bg-[#020617] text-white px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.2)] flex items-center gap-4 border border-yellow-400/30 backdrop-blur-xl"
          >
            <div className="w-8 h-8 bg-green-600/20 border border-yellow-400/50 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)] text-yellow-400">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black tracking-widest text-yellow-400">TRANSFERÊNCIA CONCLUÍDA!</p>
              <p className="text-[10px] text-yellow-500/70 font-mono tracking-widest mt-1">Dados validados na área de transferência.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 dark:bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
