'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown,
  ChevronUp,
  Zap, 
  UserPlus, 
  RefreshCw, 
  FileText, 
  AlertTriangle, 
  CreditCard, 
  Trash2, 
  Clock, 
  MapPin, 
  ArrowLeftRight,
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
  Star,
  Flame,
  Sun,
  Moon,
  Sparkles,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  BookmarkCheck,
  Terminal,
  Cpu
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const OPERATIONAL_TIPS = [
  "Conexões Novas: sempre declare a carga real de equipamentos no SAP CRM para evitar rejeição da solicitação.",
  "Religação Monofásica: taxa regulatória de R$ 11,80 com prazo de execução de 24h a 48h.",
  "Troca de Titularidade sem Débito: certifique-se da ausência de pendências financeiras na UC conforme Informativo 029/2025.",
  "Troca Titularidade Cooperativas: retorno de titularidade FIT/ACER conforme Informativo nº 106/2026.",
  "Registro de Danos Elétricos: detalhe marca, modelo, tempo de uso e relato de oscilação ou falta de energia.",
  "Baixa Renda: confirme a data da última atualização do NIS e anexe a documentação necessária ao CRM."
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'alteracao': 'Atualização de parceiro, instalação e classe',
  'ligacao-nova': 'Padrão pronto, financiamento e deferimentos',
  'reativacao': 'Religação de unidade e verificação de padrão',
  'provisoria': 'Eventos e obras com ou sem medição',
  'troca-titularidade': 'Troca com/sem débito e cooperativas',
  'parcelamento': 'Simulação de débitos e tabela de alçadas',
  'desligamento': 'Desativação definitiva de conta contrato',
  'danos': 'Ressarcimento de aparelhos danificados',
  'tensao': 'Oscilações frequentes e desequilíbrio',
  'fraude': 'Registro anônimo de irregularidades e desvio',
  'reclamacao': 'Registro formal de insatisfação e prazos',
  'manifesto-cliente': 'Elogios e agradecimentos ao atendimento',
  'religacao': 'Monofásica (R$ 11,80), trifásica e troca',
  'servico-tecnico-rede': 'Deslocamento de poste e infraestrutura',
  'medidor': 'Aferição, avaria, mudança de local e ramal',
  'fatura': '2ª via, adimplência, data certa e digital',
  'baixa-renda': 'Tarifa social, inativação e análise NIS',
  'emergencial': 'Falta de fase, cabo partido e risco',
  'devolucao': 'Pagamento duplicado e crédito em fatura',
  'debito-automatico': 'Cadastro bancário e termo de adesão'
};

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
        "absolute hidden group-hover/tooltip:block z-50 px-2.5 py-1.5 bg-[#101F30] text-[#F5F8FC] border border-[#183B56] text-[11px] font-medium rounded-md shadow-2xl pointer-events-none whitespace-nowrap",
        positionClasses[position]
      )}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 2 }}
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
        content: '*** VEIO AO ATENDIMENTO PORTANDO CPF E RG E DOCUMENTAÇÃO PARA SOLICITAR ALTERAÇÃO DOS DADOS CONFORME A DOCUMENTAÇÃO APRESENTADA.\nENDEREÇO DO SISTEMA:\nENDEREÇO CONFORME A DOCUMENTAÇÃO APRESENTADA:'
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
        content: 'COORD. GEOGRÁFICAS: XXXXXXXXXXXXXXXXXX\nPONTO DE REFERÊNCIA: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nANÁLISE DUP CADASTRO? SIM \nPADRÃO INSTALADO EXTERNAMENTE?  SIM \nCHECKLIST PADRÃO MONTADO ASSINADO PELO CLIENTE? SIM \nPOSSUI REDE ELÉTRICA PROX. AO IMÓVEL? SIM / NAO\nAMPERAGEM DO DISJUNTOR : 25A\nA INSTALAÇÃO POSSUI OU CONTARÁ  COM CARREGADORES PARA VEÍCULOS ELÉTRICOS ?  SIM / NÃO \nCASO  SIM, INFORMAR DADOS DO CARREGADOR : (Potência e modelo da estação de carregamento ou carregador portátil Casos Específicos)\nTELEFONE: XXXXXXXXXXXXX \nWHATSAPP: XXXXXXXXXXXXX\nE-MAIL VÁLIDO: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nENDEREÇO DA CONEXÃO É O MESMO ENDEREÇO DE CORRESPONDÊNCIA? SIM \nENDEREÇO CORRESPONDÊNCIA: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXX  VEIO AO ATENDIMENTO E SOLICITOU CONEXÃO. CIENTE DO PRAZO DE VISTORIA E QUE, EM CASO DE PADRÃO INCOMPLETO/INEXISTENTE, SEU PEDIDO SERÁ REJEITADO. \n**ANEXO DOC. DO SOLICITANTE E FORMULÁRIO DE CONEXÃO ASSINADO.'
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
        content: 'DOCUMENTAÇÃO APROVADA.\nCARTA DEFERIMENTO ENTREGUE EM MÃOS AO SR(A)XXXXXXXX\nCARTA ASSINADA NO ANEXO DA NOTA'
      },
      {
        id: 'oc-deferimento-estudo',
        title: 'Script para Carta de Deferimento Aprovada c/ Estudo',
        content: 'DOCUMENTAÇÃO APROVADA C/ ESTUDO\nCARTA DEFERIMENTO ENTREGUE EM MÃOS AO SR(A)XXXXXXXX\nCARTA ASSINADA NO ANEXO DA NOTA'
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
        content: 'SOLICITAÇÃO: TROCA DE TITULARIDADE DA INSTALAÇÃO XXXXX, ATUALMENTE EM NOME\nDE XXXXXXXXXXXXXX\nMOTIVO DA TROCA:\nDATA DE OCUPAÇÃO:\nDÉBITOS NA INSTALAÇÃO: ( ) SIM – VALOR: ( ) NÃO\nOBSERVAÇÕES:\nTROCA DE TITULARIDADE REALIZADA COM DOCUMENTO DE POSSE OU PROPRIEDADE, COM\nNOVO TITULAR ASSUMINDO POR LIVRE ESPONTANEA VONTADE'
      },
      {
        id: 'troca-titularidade-unidades-geradoras',
        title: 'Troca de Titularidade de Unidades Geradoras',
        content: 'ABERTA PARA GARANTIR A EFETIVAÇÃO COMPLETA DO PROCESSO DE TROCA DE TITULARIDADE DA UNIDADE GERADORA. ESSA ETAPA É PARA ATIVAÇÃO E MANUTENÇÃO DOS FLAGS DE GERAÇÃO DISTRIBUÍDA (GD) NO SISTEMA, ASSEGURANDO QUE A UNIDADE GERADORA CONTINUE DEVIDAMENTE CONFIGURADA PARA PARTICIPAÇÃO NO SISTEMA DE COMPENSAÇÃO DE ENERGIA ELÉTRICA (SCEE) E ATENDENDO ÀS REGULAMENTAÇÕES VIGENTES.'
      },
      {
        id: 'troca-titularidade-cooperativas',
        title: 'Troca de Titularidade Cooperativas',
        content: 'Retorno de titularidade, tendo como titular atual a empresa FIT/ACER. Atendimento realizado conforme orientações do Informativo nº 106/2026.'
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
        content: '****VEIO AO ATENDIMENTO PORTANDO CPF E RG SOLICITAR ANTECIPAÇÃO DE PARCELAS DA NEGOCIAÇÃO ****.\nCIENTE QUE SERÃO ANTECIPADAS **** PARCELAS DE ****CADA, TOTALIZANDO ****. CIENTE QUE APÓS ANTECIPAÇÃO NÃO TEM COMO REVERTER E AS PARCELAS SERÃO GERADAS SEPARADAMENTE DA FATURA DE CONSUMO NORMAL\nTIPO DE FATURAS ( ) CNR ( X ) NORMAIS\nTELEFONE: ****'
      },
      {
        id: 'parcelamento-ccs',
        title: 'Parcelamento CCS',
        content: 'PARCELAMENTO DEBITOS REALIZADO CONFORME ACORDO COM CLIENTE'
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
        content: '*** RECLAMA QUE ESTA OCORRENDO OSCILAÇÃO CONSTANTE NA INSTALAÇÃO HÁ MAIS DE 07 DIAS.\nINFORMA QUE OCORRE SEMPRE: TODOS OS DIAS ( ) FIM DE SEMANA ( ) ALGUNS DIAS DA SEMANA ( ) quais ? (INFORMAR O DIA DA SEMANA ESPECÍFICO)\nO PROBLEMA ACONTECE NO PERÍODO: MANHÃ ( ) TARDE ( ) NOITE ( )\nACONTECE EM TODOS OS CÔMODOS DA INSTALAÇÃOU APENAS EM ALGUNS CÔMODOS?\nO CLIENTE ADQUIRIU ALGUM ELETRODOMÉSTICO OU EQUIPAMENTO ELÉTRICO RECENETEMENTE? SIM ( ) NÃO ( )\nO CLIENTE TEM CONHECIMENTO DE ALGUM COMÉRCIO, OFICINA OU INDÚSTRIA PRÓX. A SUA RESIDÊNCIA?\nMEIO DE COMUNICAÇÃO:\nPONTO DE REFERÊNCIA:\nCONTATO:'
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
        content: 'OBS: (A DENÚNCIA DEVE SER GERADA NA CONTA CONTRATO ESPECÍFICA DENUNCIA NO SAP - basta inserir no campo parceiro de negócio a palavra DENUNCIA; No AJURI usar o Código Único 019).\n\nCLIENTE ANÔNIMO DESCRIÇÃO DA DENUNCIA:\nINFORMA FRAUDE NO FORNECIMENTO DE ENERGIA ELÉTRICA.\nNOME DO RESPONSAVEL:\nRUA:xxx BAIRRO:xxx CIDADE:xxx\nPONTO DE REFERENCIA: xxx\nCOR DA CASA:xxxCASA MURADA: SIM/ NAO TEM MEDIDOR: SIM/ NAO TEM HORARIO ESPECIFICO PARA A FRAUDE: SIM/ NAO FAVOR VERIFICAR U55XXXXX'
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
        content: 'Script da Reclamação:\nDESCRIÇÃO DA RECLAMAÇÃO:\nSOLUÇÃO PRETENDIDA:\nANÁLISE DO ATENDENTE:\nMEIO DE RESPOSTA DA RECLAMAÇÃO: TELEFONE ( ) CARTA ( ) E-MAIL ( )\nACEITA RECEBER RESPOSTA / FATURA VIA WHATSAPP: SIM ( ) NÃO ( )\nTELEFONE PARA CONTATO: (DDD) XXXXX\nMELHOR HORÁRIO PARA CONTATO: MANHÃ ( ) TARDE ( )\nE-MAIL: XXXX (quando o cliente não possui e-mail, sinalizar com o texto "não informado")\nAUTORIZA TERCEIROS: SIM ( ) NÃO ( )\nINFORMAÇÕES COMPLEMENTARES:'
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
        id: 'religacao-monofasica',
        title: 'Religação Monofásica',
        content: 'CLIENTE VEIO AO ATENDIMENTO E SOLICITA A RELIGACAO\nCLIENTE APRESENTOU COMPROVANTE DE PAGAMENTO DAS FATURAS VENCIDAS COMPROVANTES DE PAGAMENTO ANEXADOS NO SISTEMA\nCLIENTE CIENTE DA TAXA DE 11,80 E PRAZO DE 24 / 48 HORAS\nPONTO DE REFERÊNCIA:\nCONTATO:'
      },
      {
        id: 'religacao-trifasica',
        title: 'Religação Trifásica',
        content: 'CLIENTE VEIO AO ATENDIMENTO E SOLICITA A RELIGACAO\nCLIENTE APRESENTOU COMPROVANTE DE PAGAMENTO DAS FATURAS VENCIDAS COMPROVANTES DE PAGAMENTO ANEXADOS NO SISTEMA\nCLIENTE CIENTE DA TAXA DE R$ 48,79 E PRAZO DE 24 / 48 HORAS\nPONTO DE REFERÊNCIA:\nCONTATO:'
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
        content: 'VEIO ATE O ATENDIMENTO PORTANDO RG E CPF E SOLICITA SERVICO TECNICO DESLOCAMENTO DE POSTE EM PROPRIEDADE PARTICULAR INFORMA QUE O POSTE DE REDE ESTA EM FRENTE A ENTRADA DE SUA RESIDENCIA ATRAPALHANDO O TRAFEGO CLIENTE CIENTE DE POSSIVEL PARTICIPACAO FINANCEIRA APOS VISTORIA NO LOCAL.\nPONTO DE REFERENCIA:\nTELEFONE:'
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
        content: 'VEIO AO ATENDIMENTO COM RG E CPF SOLICITAR VISITA TÉCNICA EM SEU IMÓVEL, POIS AFIRMA QUE SEU MEDIDOR ESTÁ APRESENTANDO DEFEITOS. COMO FORMA DE RESPALDO E PRECAVENDO-SE O MESMO ABRIU SOLICITAÇÃO PARA REGULARIZAÇÃO. APRESENTOU RG CPF ESTÁ CIENTE DO PRAZO DE ATENDIMENTO.\nPONTO DE REFERÊNCIA:\nCONTATO:'
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
        content: 'PARA TROCA DE PADRÃO COM ACRESCIMO DE CARGA ( )\nSEM ACRESCIMO DE CARGA ( ) PONTO DE REF: EM FRENTE AO BRUCE CHAVEIRO TELEFONE:\nCLIENTE INFORMA QUE JÁ INSTALOU O PADRÃO CONVENCIONAL DE ACORDO COM AS NORMAS TÉCNICAS, INFORMA CABO DE 10MM E DISJUNOR DE 40A CLIENTE CIENTE DO PRAZO DE 5 DIAS UTEIS, EM CASOS DE PENDENCIAS DE SUA RESPONSABILIDADE O PEDIDO PODERÁ SER REJEITADO.'
      },
      {
        id: 'troca-padrao-substituicao',
        title: 'Troca de Padrão (Substituição de Cabo)',
        content: 'SEM ACRÉSCIMO P/ SUBSTITUIÇÃO DE CABO-PERMANECENDO A FASE\n\nPONTO DE REF: XXXX\nTELEFONE: XXX\nCLIENTE COMPARECEU AO ATENDIMENTO SOLICITANDO TROCA DE PADRÃO SEM ACRÉSCIMO O MESMO PERMANECERÁ COM A MESMA FASE TRIFÁSICO, PORÉM DESEJA A SUSBTITUIÇÃO DO RAMAL DE 10MM PARA 25MM, COM DISJUNTOR DE 70A, CLIENTE INFORMA QUE JÁ REALIZOU AS DEVIDAS ADEQUAÇÕES CLIENTE CIENTE DE TODAS AS INFORMAÇÕES, INCLUSIVE QUE SE TIVER PENDENCIAS EM RELAÇÃO AO SEU PADRÃO PEDIDO PODERÁ SER REJEITADO.'
      },
      {
        id: 'deslocamento-ramal',
        title: 'Deslocamento de Ramal',
        content: '**** VEIO AO ATENDIMENTO COM RG E CPF SOLICITAR O DESLOCAMENTO DE SEU RAMAL. AFIRMA QUE PONTALETE PADRÃO ESTÁ DEVIDAMENTE MONTADO NO LOCAL CORRETO ESTÁ CIENTE DO PRAZO DE ATENDIMENTO DO SERVIÇO.\nPONTO DE REFERÊNCIA:\nCONTATO:'
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
        content: '*** VEIO AO ATENDIMENTO PORTANDO RG, CPF E NIS E SOLICITA ANÁLISE CADASTRO BAIXA RENDA. SEGUE PRINT DE ERRO DE CADASTRO NO ATENDIMENTO, PARA CADASTRAMENTO NO SISTEMA. SEGUE EM ANEXO FOLHA RESUMO, RG E CPF. PRINTS DE TELAS DO SOMOS EXCLUSAO DA ANTIGA INSTALAÇÃO. FAVOR REALIZAR CADASTRO DO CLIENTE BAIXA RENDA.\nINSTALAÇÃO:\nCONTA CONTRATO:\nTITULAR DO NIS:\nDATA NASCIMENTO:\nRG:\nCPF:\nNIS:\nCÓDIGO FAMILIAR:\nCONTATO:'
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
        content: '#AG# ***** VEIO AO ATENDIMENTO COM RG E CPF INFORMAR FALTA DE ENERGIA AFETANDO SOMENTE SUA CASA, CLIENTE INFORMA QUE JÁ REALIZOU O TESTE NO DISJUNTOR E NÃOBTEVE RESULTADOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'falta-energia-geral',
        title: 'Falta de Energia Geral',
        content: '#AG# *** VEIO AO ATENDIMENTO COM RG E CPF INFORMAR FALTA DE ENERGIA AFETANDO SUA CASA E OUTRAS RESIDÊNCIAS DA LOCALIDADE CLIENTE INFORMA QUE JÁ REALIZOU O TESTE NO DISJUNTOR E NÃOBTEVE RESULTADOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
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
        content: 'CADASTRO DE DÉBITO AUTOMÁTICO SOLICITADO PELO TITULAR DA CONTA BANCÁRIA SR. XXXXXXXXXXX\nO MESMO APRESENTOU RG, CPF, COMPROVANTE DA CONTA BANCÁRIA E ASSINATURA DO TERMO DE ADESÃO. CLIENTE CIENTE DO PRAZO DE ATÉ 2 DIAS ÚTEIS PARA VALIDAÇÃO E CLIENTE QUE CASO SEJA O TITULAR DO BB DEVERÁ CONFIRMAR ADESÃO VIA SMS ENVIADO PELO BANCO.\nCONTA:\nAGÊNCIA:\nRG:\nCPF:\nBANCO:'
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
    <div className="space-y-5 mt-6">
      <div className="flex items-center gap-2.5 pb-2 border-b border-[#183B56]/40 dark:border-[#183B56]/60">
        <div className="p-1.5 rounded-lg bg-[#19C9E8]/10 text-[#19C9E8]">
          <Cpu className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-[#F5F8FC] uppercase tracking-wider">
            Tabela de Parâmetros e Alçadas de Negociação
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Limites operacionais de parcelamento de débitos por perfil de atendimento
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-5">
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            className="bg-white dark:bg-[#13273D] rounded-xl border border-slate-200 dark:border-[#183B56] overflow-hidden shadow-sm"
          >
            <div className="bg-slate-50 dark:bg-[#0E1E2F] px-4 py-3 border-b border-slate-200 dark:border-[#183B56] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <span className="text-[#183B56] dark:text-[#19C9E8] font-bold text-sm tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19C9E8]"></span>
                {cat.title}
              </span>
              <span className="text-slate-600 dark:text-slate-400 text-xs font-mono">{cat.subtitle}</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 dark:bg-[#0B1724] border-b border-slate-200 dark:border-[#183B56]/70 text-slate-600 dark:text-slate-300">
                    <th className="p-2.5 font-bold uppercase tracking-wider border-r border-slate-200 dark:border-[#183B56]/70">Perfil de Atendimento</th>
                    <th className="p-2.5 font-bold uppercase tracking-wider border-r border-slate-200 dark:border-[#183B56]/70 text-center">Qtd Faturas</th>
                    <th className="p-2.5 font-bold uppercase tracking-wider text-center" colSpan={3}>Parâmetros Permitidos</th>
                  </tr>
                  <tr className="bg-slate-50/50 dark:bg-[#0D1C2C] border-b border-slate-200 dark:border-[#183B56]/50 text-slate-500 dark:text-slate-400 text-[11px]">
                    <th className="p-1.5 border-r border-slate-200 dark:border-[#183B56]/50"></th>
                    <th className="p-1.5 border-r border-slate-200 dark:border-[#183B56]/50"></th>
                    <th className="p-1.5 font-semibold text-center border-r border-slate-200 dark:border-[#183B56]/50">Entrada Mínima</th>
                    <th className="p-1.5 font-semibold text-center border-r border-slate-200 dark:border-[#183B56]/50">Nº Máx Parcelas</th>
                    <th className="p-1.5 font-semibold text-center">Dívida Máxima</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#183B56]/40">
                  {cat.profiles.map((profile) => (
                    <React.Fragment key={profile.id}>
                      {profile.rows.map((row, rowIdx) => (
                        <tr 
                          key={rowIdx} 
                          className="hover:bg-[#19C9E8]/5 dark:hover:bg-[#19C9E8]/10 transition-colors"
                        >
                          {rowIdx === 0 && (
                            <td 
                              className="p-3 font-semibold text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-[#183B56]/60 bg-slate-50/40 dark:bg-[#0E1E2F]/40" 
                              rowSpan={profile.rows.length}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-md bg-[#183B56]/20 dark:bg-[#19C9E8]/20 text-[#183B56] dark:text-[#19C9E8] flex items-center justify-center text-[10px] shrink-0 font-bold border border-[#183B56]/30 dark:border-[#19C9E8]/30">
                                  {profile.id}
                                </span>
                                <span className="leading-tight">{profile.name}</span>
                              </div>
                            </td>
                          )}
                          <td className="p-2.5 text-center text-slate-600 dark:text-slate-300 font-medium border-r border-slate-200 dark:border-[#183B56]/60">
                            {row.qty}
                          </td>
                          <td className="p-2.5 text-center font-bold text-slate-800 dark:text-[#F5F8FC] border-r border-slate-200 dark:border-[#183B56]/60">
                            <span className={cn(row.entry === '0%' ? "text-[#A3FF42] bg-[#A3FF42]/10 dark:bg-[#A3FF42]/20 px-2 py-0.5 rounded" : "")}>
                              {row.entry}
                            </span>
                          </td>
                          <td className="p-2.5 text-center font-semibold text-slate-700 dark:text-slate-200 border-r border-slate-200 dark:border-[#183B56]/60">
                            {row.maxInstallments}
                          </td>
                          <td className="p-2.5 text-center font-semibold text-slate-700 dark:text-slate-200">
                            {row.maxDebt}
                          </td>
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
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  const [tipIndex, setTipIndex] = useState(0);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % OPERATIONAL_TIPS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % OPERATIONAL_TIPS.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedTemplates(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const initData = () => {
      try {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
          setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('dark');
        }

        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }

        const savedPinned = localStorage.getItem('pinnedCategories');
        if (savedPinned) {
          setPinnedCategories(JSON.parse(savedPinned));
        }

        const savedUsage = localStorage.getItem('templateUsageCounts');
        if (savedUsage) {
          setUsageCounts(JSON.parse(savedUsage));
        }
      } catch (e) {
        console.warn('localStorage access error', e);
      }
      setMounted(true);
    };
    
    const timer = setTimeout(initData, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('pinnedCategories', JSON.stringify(pinnedCategories));
    } catch (e) {}
  }, [pinnedCategories, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('templateUsageCounts', JSON.stringify(usageCounts));
    } catch (e) {}
  }, [usageCounts, mounted]);

  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

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

  const totalTemplatesCount = useMemo(() => {
    return SERVICE_CATEGORIES.reduce((acc, cat) => acc + cat.templates.length, 0);
  }, []);

  const totalCopiesCount = useMemo(() => {
    if (!mounted) return 0;
    return Object.values(usageCounts).reduce((a, b) => a + b, 0);
  }, [usageCounts, mounted]);

  const filteredCategories = useMemo(() => {
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
        icon: <Star className="w-5 h-5 text-[#A3FF42] fill-[#A3FF42]" />,
        info: favoriteTemplates.length === 0 ? 'Você ainda não marcou nenhum template como favorito. Clique na estrela em qualquer card para fixá-lo aqui.' : undefined,
        templates: processTemplates(favoriteTemplates).filter(template => 
          !searchQuery || 
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      } as Category];
    }

    if (selectedCategory === 'most-used') {
      const allTemplates = SERVICE_CATEGORIES.flatMap(cat => cat.templates);
      const usedTemplates = allTemplates
        .filter(t => (usageCounts[t.id] || 0) > 0)
        .sort((a, b) => (usageCounts[b.id] || 0) - (usageCounts[a.id] || 0));

      return [{
        id: 'most-used',
        name: 'Templates Mais Usados',
        icon: <Flame className="w-5 h-5 text-[#19C9E8] fill-[#19C9E8]/20" />,
        info: usedTemplates.length === 0 
          ? 'Nenhum script foi copiado ainda. Ao copiar textos no sistema, eles serão classificados por frequência de uso aqui.'
          : `Exibindo ${usedTemplates.length} ${usedTemplates.length === 1 ? 'script utilizado' : 'scripts utilizados'} classificados por frequência de cópia.`,
        templates: processTemplates(usedTemplates).filter(template => 
          !searchQuery || 
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      } as Category];
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
  }, [searchQuery, favorites, selectedCategory, usageCounts, mounted]);

  const handleCopy = async (text: string, id: string) => {
    let success = false;
    setCopyErrorId(null);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      } else {
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
        if (id !== 'email-copy' && id !== 'title-copy') {
          setUsageCounts(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
          }));
        }
        setToast({ message: 'Texto copiado com sucesso para a área de transferência', type: 'success' });
        setTimeout(() => setCopiedId(null), 2000);
        setTimeout(() => setToast(null), 3000);
      } else {
        setCopyErrorId(id);
        setToast({ message: 'Não foi possível copiar o texto.', type: 'error' });
        setTimeout(() => setCopyErrorId(null), 3000);
        setTimeout(() => setToast(null), 3000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopyErrorId(id);
      setToast({ message: 'Erro ao copiar para a área de transferência.', type: 'error' });
      setTimeout(() => setCopyErrorId(null), 3000);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="h-screen bg-[#F5F8FC] dark:bg-[#101F30] text-slate-900 dark:text-[#F5F8FC] font-sans flex overflow-hidden transition-colors duration-300 relative selection:bg-[#A3FF42] selection:text-[#101F30]">
      {/* Background Subtle Circuit Mesh / Ambient Tech Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Subtle Ambient Orbs */}
        <div className="absolute left-[-5%] top-[-10%] w-[45%] h-[45%] rounded-full bg-[#19C9E8]/10 dark:bg-[#183B56]/40 blur-[130px]" />
        <div className="absolute right-[-10%] bottom-[-10%] w-[50%] h-[50%] rounded-full bg-[#A3FF42]/10 dark:bg-[#19C9E8]/10 blur-[150px]" />
        <div className="absolute top-[35%] left-[50%] w-[35%] h-[35%] rounded-full bg-[#183B56]/10 dark:bg-[#101F30]/60 blur-[120px]" />

        {/* Discrete Circuit Traces / Tech Grid SVG */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] stroke-slate-900 dark:stroke-cyan-400" 
          xmlns="http://www.w3.org/2000/svg" 
          width="100%" 
          height="100%"
        >
          <defs>
            <pattern id="tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="1" />
              <circle cx="60" cy="0" r="1.5" />
              <circle cx="0" cy="60" r="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
        </svg>

        {/* Ambient Subtle Energy Watermarks */}
        <div className="absolute top-12 left-10 text-slate-900/[0.02] dark:text-[#19C9E8]/[0.03] font-black text-3xl lg:text-5xl uppercase tracking-widest rotate-[-3deg] whitespace-nowrap">
          ENERGY TECH • CENTRAL DE ATENDIMENTO ENERGÉTICO
        </div>
        <div className="absolute top-[48%] right-8 text-slate-900/[0.02] dark:text-[#A3FF42]/[0.025] font-black text-2xl lg:text-4xl uppercase tracking-widest rotate-[2deg] whitespace-nowrap">
          AGILIDADE OPERACIONAL • PADRONIZAÇÃO DE SCRIPTS
        </div>
        <div className="absolute bottom-16 left-12 text-slate-900/[0.02] dark:text-[#19C9E8]/[0.025] font-black text-2xl lg:text-4xl uppercase tracking-widest rotate-[-1deg] whitespace-nowrap">
          CONFIABILIDADE & EFICIÊNCIA • SISTEMA INTEGRADO
        </div>
      </div>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border backdrop-blur-xl"
            style={{
              backgroundColor: toast.type === 'success' ? '#101F30' : '#101F30',
              borderColor: toast.type === 'success' ? '#A3FF42' : '#EF4444',
              color: '#F5F8FC'
            }}
          >
            {toast.type === 'success' ? (
              <div className="w-6 h-6 rounded-md bg-[#A3FF42]/20 border border-[#A3FF42]/50 flex items-center justify-center text-[#A3FF42]">
                <Check className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-md bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
            )}
            <span className="text-xs font-semibold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white/95 dark:bg-[#0B1724]/95 backdrop-blur-xl border-r border-slate-200 dark:border-[#183B56]/70 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col h-full shadow-lg lg:shadow-none",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full relative z-10">
          {/* Sidebar Header */}
          <div className="p-5 border-b border-slate-200 dark:border-[#183B56]/60 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-[#0E1E2F]/50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#183B56] to-[#101F30] border border-[#19C9E8]/40 flex items-center justify-center text-[#A3FF42] shadow-sm shrink-0">
                <Zap className="w-5 h-5 fill-[#A3FF42] text-[#A3FF42]" />
              </div>
              <div>
                <span className="font-black text-base tracking-tight text-slate-900 dark:text-[#F5F8FC] uppercase block leading-tight">
                  TEXTO PADRÃO
                </span>
                <span className="text-[10px] font-bold text-[#19C9E8] tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A3FF42] animate-pulse"></span>
                  ENERGY TECH
                </span>
              </div>
            </div>
            <Tooltip text="Fechar Menu" position="left">
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#183B56]/40"
              >
                <X className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>

          {/* Quick Filters */}
          <div className="p-3 border-b border-slate-200 dark:border-[#183B56]/50 space-y-1">
            <button
              onClick={() => handleCategorySelect(null)}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all border",
                selectedCategory === null 
                  ? "bg-[#183B56]/15 dark:bg-[#183B56]/60 text-slate-900 dark:text-[#A3FF42] border-[#183B56]/40 dark:border-[#19C9E8]/40 shadow-xs" 
                  : "text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-[#183B56]/30 hover:text-slate-900 dark:hover:text-[#F5F8FC]"
              )}
            >
              <Layers className="w-4 h-4 text-[#19C9E8]" />
              <span className="flex-1 text-left">Todos os Serviços</span>
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                {SERVICE_CATEGORIES.length}
              </span>
            </button>

            <button
              onClick={() => handleCategorySelect('most-used')}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all border",
                selectedCategory === 'most-used' 
                  ? "bg-[#183B56]/15 dark:bg-[#183B56]/60 text-slate-900 dark:text-[#A3FF42] border-[#183B56]/40 dark:border-[#19C9E8]/40 shadow-xs" 
                  : "text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-[#183B56]/30 hover:text-slate-900 dark:hover:text-[#F5F8FC]"
              )}
            >
              <Flame className={cn("w-4 h-4 text-[#19C9E8]", selectedCategory === 'most-used' && "fill-[#19C9E8]/30")} />
              <span className="flex-1 text-left">Mais Utilizados</span>
              {mounted && totalCopiesCount > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#19C9E8]/10 dark:bg-[#19C9E8]/20 text-[#19C9E8] font-bold border border-[#19C9E8]/30">
                  {totalCopiesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleCategorySelect('favorites')}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all border",
                selectedCategory === 'favorites' 
                  ? "bg-[#183B56]/15 dark:bg-[#183B56]/60 text-slate-900 dark:text-[#A3FF42] border-[#183B56]/40 dark:border-[#19C9E8]/40 shadow-xs" 
                  : "text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-[#183B56]/30 hover:text-slate-900 dark:hover:text-[#F5F8FC]"
              )}
            >
              <Star className={cn("w-4 h-4 text-[#A3FF42]", selectedCategory === 'favorites' && "fill-[#A3FF42]")} />
              <span className="flex-1 text-left">Meus Favoritos</span>
              {mounted && favorites.length > 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#A3FF42]/10 dark:bg-[#A3FF42]/20 text-emerald-600 dark:text-[#A3FF42] font-bold border border-[#A3FF42]/30">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>

          {/* Categories List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-[#183B56] scrollbar-track-transparent">
            <div className="py-2 px-2 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                Categorias ({SERVICE_CATEGORIES.length})
              </span>
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
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all border",
                    selectedCategory === cat.id 
                      ? "bg-[#183B56]/20 dark:bg-[#183B56]/70 text-slate-900 dark:text-[#F5F8FC] border-[#19C9E8]/50 shadow-xs" 
                      : "text-slate-700 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-[#183B56]/30 hover:text-slate-900 dark:hover:text-[#F5F8FC]"
                  )}
                >
                  <div className={cn(
                    "p-1 rounded-md transition-colors",
                    selectedCategory === cat.id 
                      ? "text-[#19C9E8] dark:text-[#A3FF42]" 
                      : "text-slate-500 dark:text-slate-400 group-hover:text-[#19C9E8]"
                  )}>
                    {cat.icon}
                  </div>
                  <span className="flex-1 text-left truncate pr-5">{cat.name}</span>
                </button>
                
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                  <Tooltip text={pinnedCategories.includes(cat.id) ? "Desafixar categoria" : "Fixar no topo"} position="left">
                    <button
                      onClick={(e) => togglePin(cat.id, e)}
                      className={cn(
                        "p-1 rounded transition-all opacity-0 group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-[#183B56]",
                        pinnedCategories.includes(cat.id) && "opacity-100 text-[#19C9E8]"
                      )}
                    >
                      <Pin className={cn("w-3 h-3", pinnedCategories.includes(cat.id) && "fill-current text-[#19C9E8]")} />
                    </button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-[#183B56]/60 bg-slate-50/50 dark:bg-[#0B1724] shrink-0 text-xs">
            <div className="flex items-center gap-2 mb-1.5 text-slate-800 dark:text-slate-200 font-semibold">
              <Zap className="w-3.5 h-3.5 text-[#A3FF42] fill-[#A3FF42]" />
              <span>Central Energética Leste</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              v2.8 • Base de Atendimento
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Intelligent Top Header */}
        <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#101F30]/90 backdrop-blur-xl border-b border-slate-200 dark:border-[#183B56]/80 transition-colors duration-300 shadow-xs shrink-0">
          <div className="h-0.5 bg-gradient-to-r from-[#19C9E8] via-[#A3FF42] to-[#19C9E8] pointer-events-none" />
          
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            {/* Left: Mobile menu toggle + Brand Title */}
            <div className="flex items-center gap-3">
              <Tooltip text="Abrir Menu" position="right">
                <button 
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#183B56]/40 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </Tooltip>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#183B56] border border-[#19C9E8]/50 flex items-center justify-center text-[#A3FF42] shadow-xs">
                  <Zap className="w-4 h-4 fill-[#A3FF42]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm tracking-tight text-slate-900 dark:text-[#F5F8FC] uppercase">
                      TEXTO PADRÃO
                    </span>
                    <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-[#19C9E8]/10 text-[#19C9E8] border border-[#19C9E8]/30">
                      ENERGY TECH
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
                    CENTRAL DE ATENDIMENTO ENERGÉTICO
                  </span>
                </div>
              </div>
            </div>

            {/* Center: Search Field */}
            <div className="flex-1 max-w-xl mx-2 hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#19C9E8] transition-colors" />
                <input 
                  type="text"
                  placeholder="Pesquisar por serviço, código, procedimento ou palavra-chave..."
                  className="w-full pl-10 pr-9 py-2 bg-slate-100/90 dark:bg-[#0B1724] border border-slate-200 dark:border-[#183B56] focus:border-[#19C9E8] dark:focus:border-[#19C9E8] focus:bg-white dark:focus:bg-[#0B1724] focus:ring-1 focus:ring-[#19C9E8]/40 rounded-lg text-xs font-mono tracking-wide transition-all outline-none text-slate-900 dark:text-[#F5F8FC] placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Operational Status & Controls */}
            <div className="flex items-center gap-3">
              {/* Operational Indicator */}
              <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-[#0B1724] border border-slate-200 dark:border-[#183B56] text-[11px] font-mono text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-[#A3FF42] animate-pulse"></span>
                <span className="font-semibold">REDE ATIVA</span>
              </div>

              {/* Theme Toggle Button */}
              <Tooltip text={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'} position="bottom">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-[#0B1724] border border-slate-200 dark:border-[#183B56] text-slate-700 dark:text-slate-200 hover:border-[#19C9E8]/60 transition-all cursor-pointer shadow-xs"
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4 text-slate-700" />
                  ) : (
                    <Sun className="w-4 h-4 text-[#A3FF42]" />
                  )}
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="px-4 pb-3 md:hidden">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 group-focus-within:text-[#19C9E8] transition-colors" />
              <input 
                type="text"
                placeholder="Pesquisar textos ou procedimentos..."
                className="w-full pl-10 pr-9 py-2 bg-slate-100 dark:bg-[#0B1724] border border-slate-200 dark:border-[#183B56] focus:border-[#19C9E8] rounded-lg text-xs font-mono outline-none text-slate-900 dark:text-[#F5F8FC]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Main Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-[#183B56] relative z-10">
          {/* Energy Tech Hero Panel */}
          <div className="bg-gradient-to-r from-white via-slate-50 to-white dark:from-[#0E1E2F] dark:via-[#13273D] dark:to-[#0E1E2F] border border-slate-200 dark:border-[#183B56] rounded-2xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
            {/* Subtle high-tech accent light */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#19C9E8]/10 dark:bg-[#19C9E8]/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider bg-[#101F30] text-[#A3FF42] border border-[#183B56]">
                    CENTRAL DE ATENDIMENTO ENERGÉTICO
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Eficiência • Padronização • Resoluções Normativas
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-[#F5F8FC] tracking-tight">
                  Biblioteca Integrada de Scripts & Procedimentos
                </h1>

                {/* Rotating Operational Tip */}
                <div className="flex items-start gap-2.5 pt-1 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  <span className="text-[#19C9E8] font-bold shrink-0">DIRETRIZ:</span>
                  <motion.p
                    key={tipIndex}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="leading-relaxed"
                  >
                    &ldquo;{OPERATIONAL_TIPS[tipIndex]}&rdquo;
                  </motion.p>
                </div>
              </div>

              {/* Quick Operational Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
                <div className="bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-[#183B56] p-3 rounded-xl min-w-[110px]">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Categorias
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-[#19C9E8] font-mono">
                    {SERVICE_CATEGORIES.length}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-[#183B56] p-3 rounded-xl min-w-[110px]">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Templates
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-[#F5F8FC] font-mono">
                    {totalTemplatesCount}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-[#183B56] p-3 rounded-xl min-w-[110px]">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Total Cópias
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-[#A3FF42] font-mono">
                    {totalCopiesCount}
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-[#0B1724] border border-slate-200 dark:border-[#183B56] p-3 rounded-xl min-w-[110px]">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Favoritos
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-amber-400 font-mono">
                    {favorites.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Change tip button */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-[#183B56]/50 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Alinhado aos manuais de atendimento e Informtivos Operacionais vigentes.
              </span>
              <button
                onClick={nextTip}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#183B56] dark:text-[#19C9E8] hover:text-[#19C9E8] dark:hover:text-[#A3FF42] transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Próxima Diretriz</span>
              </button>
            </div>
          </div>

          {/* Operational Notice: Carga Declarada Incompleta */}
          <div className="bg-amber-500/10 dark:bg-[#183B56]/40 border border-amber-500/30 dark:border-amber-500/40 rounded-xl p-4 sm:p-5 flex items-start gap-3.5">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  REGISTRO OPERACIONAL DE ATENDIMENTO
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  OBRIGATÓRIO
                </span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                <strong>CARGA DECLARADA INCOMPLETA:</strong> Ligações novas e reativações precisam constar no SAP CRM com uma declaração real e detalhada dos equipamentos utilizados pelo cliente. Declarações genéricas (ex: apenas lâmpadas) serão sumariamente rejeitadas.
              </p>
            </div>
          </div>

          {/* Quick Access Category Cards (when no specific category is filtered or when viewing all) */}
          {!selectedCategory && !searchQuery && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#19C9E8]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-[#F5F8FC]">
                    Acesso Rápido aos Serviços
                  </h2>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Clique para navegar diretamente ao serviço
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {SERVICE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="p-3.5 bg-white dark:bg-[#13273D] border border-slate-200 dark:border-[#183B56] hover:border-[#19C9E8] dark:hover:border-[#19C9E8] rounded-xl text-left transition-all duration-200 hover:shadow-md group flex flex-col justify-between h-full cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-[#0B1724] text-[#183B56] dark:text-[#19C9E8] group-hover:text-[#A3FF42] transition-colors">
                          {cat.icon}
                        </div>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#0B1724] text-slate-500 dark:text-slate-400">
                          {cat.templates.length}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-[#F5F8FC] leading-snug group-hover:text-[#19C9E8] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed font-sans">
                        {CATEGORY_DESCRIPTIONS[cat.id] || `${cat.templates.length} scripts padronizados`}
                      </p>
                    </div>
                    
                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-[#183B56]/60 flex items-center justify-between text-[10px] font-semibold text-slate-500 dark:text-slate-400 group-hover:text-[#19C9E8]">
                      <span>Consultar</span>
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filter Bar (when viewing a single category or search) */}
          {(selectedCategory || searchQuery) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white dark:bg-[#13273D] border border-slate-200 dark:border-[#183B56] rounded-xl shadow-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-500 dark:text-slate-400">Visualizando:</span>
                {selectedCategory && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#183B56]/15 dark:bg-[#183B56] text-[#183B56] dark:text-[#A3FF42] border border-[#183B56]/30 dark:border-[#19C9E8]/40 flex items-center gap-1.5">
                    {selectedCategory === 'favorites' ? 'Meus Favoritos' : selectedCategory === 'most-used' ? 'Mais Utilizados' : SERVICE_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-[#0B1724] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#183B56] flex items-center gap-1.5">
                    Busca: &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-[#183B56]/50 transition-colors"
                  >
                    Limpar Busca
                  </button>
                )}
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="px-3 py-1 text-xs font-semibold bg-[#183B56] dark:bg-[#183B56] text-[#A3FF42] hover:bg-[#101F30] rounded-lg transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <span>Ver Todos os Serviços</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Template Library Categories */}
          <AnimatePresence mode="popLayout">
            {filteredCategories
              .filter(cat => !selectedCategory || cat.id === selectedCategory)
              .map((category) => (
                <motion.section 
                  key={category.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="space-y-4 pt-2"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-[#183B56]/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-[#183B56] rounded-xl flex items-center justify-center text-[#183B56] dark:text-[#A3FF42] border border-slate-200 dark:border-[#19C9E8]/30 shadow-xs">
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-slate-900 dark:text-[#F5F8FC] tracking-tight">
                          {category.name}
                        </h2>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {category.templates.length} {category.templates.length === 1 ? 'script disponível' : 'scripts disponíveis'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Tooltip text={pinnedCategories.includes(category.id) ? "Desafixar" : "Fixar categoria"}>
                        <button
                          onClick={(e) => togglePin(category.id, e)}
                          className={cn(
                            "p-2 rounded-lg border transition-all text-xs flex items-center gap-1 cursor-pointer",
                            pinnedCategories.includes(category.id)
                              ? "bg-[#19C9E8]/10 text-[#19C9E8] border-[#19C9E8]/40"
                              : "bg-white dark:bg-[#13273D] border-slate-200 dark:border-[#183B56] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                          )}
                        >
                          <Pin className={cn("w-3.5 h-3.5", pinnedCategories.includes(category.id) && "fill-current")} />
                          <span className="hidden sm:inline text-[11px] font-semibold">
                            {pinnedCategories.includes(category.id) ? "Fixada" : "Fixar"}
                          </span>
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Category Info Box (e.g., Ligação Nova Instructions & Quick Copies) */}
                  {category.info && (
                    <div className="bg-slate-50 dark:bg-[#0E1E2F] border border-slate-200 dark:border-[#183B56] rounded-xl p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-[#19C9E8] shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono whitespace-pre-wrap">
                          {category.info}
                        </p>
                      </div>

                      {category.info.includes('naoinformado@equatorialenergia.com.br') && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200/80 dark:border-[#183B56]/60">
                          <Tooltip text={copiedId === 'email-copy' ? "Email Copiado!" : "Copiar email padrão"}>
                            <button
                              onClick={() => handleCopy('naoinformado@equatorialenergia.com.br', 'email-copy')}
                              className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border shadow-xs cursor-pointer",
                                copiedId === 'email-copy'
                                  ? "bg-[#A3FF42] text-[#101F30] border-[#A3FF42]"
                                  : "bg-white dark:bg-[#183B56] text-slate-800 dark:text-[#F5F8FC] border-slate-300 dark:border-[#19C9E8]/50 hover:bg-slate-100 dark:hover:bg-[#183B56]/80"
                              )}
                            >
                              {copiedId === 'email-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>Copiar E-mail Padrão</span>
                            </button>
                          </Tooltip>

                          {category.info.includes('Carta de Deferimento assinada_UC XXXX') && (
                            <Tooltip text={copiedId === 'title-copy' ? "Título Copiado!" : "Copiar nome padrão do arquivo"}>
                              <button
                                onClick={() => handleCopy('Carta de Deferimento assinada_UC XXXX', 'title-copy')}
                                className={cn(
                                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all border shadow-xs cursor-pointer",
                                  copiedId === 'title-copy'
                                    ? "bg-[#A3FF42] text-[#101F30] border-[#A3FF42]"
                                    : "bg-white dark:bg-[#183B56] text-slate-800 dark:text-[#F5F8FC] border-slate-300 dark:border-[#19C9E8]/50 hover:bg-slate-100 dark:hover:bg-[#183B56]/80"
                                )}
                              >
                                {copiedId === 'title-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>Copiar Título da Carta</span>
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Empty state for category */}
                  {category.templates.length === 0 ? (
                    <div className="bg-white dark:bg-[#13273D] border border-dashed border-slate-300 dark:border-[#183B56] rounded-xl p-8 text-center flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-[#0B1724] text-slate-400 flex items-center justify-center mb-2">
                        {category.id === 'favorites' ? <Star className="w-5 h-5" /> : <Flame className="w-5 h-5" />}
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 dark:text-[#F5F8FC]">
                        {category.id === 'favorites' ? 'Nenhum favorito cadastrado' : 'Nenhum script utilizado ainda'}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                        {category.id === 'favorites' 
                          ? 'Clique na estrela em qualquer card para adicioná-lo à sua lista de acesso rápido.'
                          : 'Conforme você copiar textos pelo sistema, os mais frequentes serão ranqueados aqui.'}
                      </p>
                    </div>
                  ) : (
                    /* Templates Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {category.templates.map((template) => {
                        const isExpanded = expandedTemplates.includes(template.id);
                        const isFav = favorites.includes(template.id);
                        const isCopied = copiedId === template.id;
                        const copyCount = usageCounts[template.id] || 0;

                        return (
                          <motion.div
                            key={template.id}
                            layoutId={template.id}
                            className="bg-white dark:bg-[#13273D] border border-slate-200 dark:border-[#183B56] rounded-xl p-5 hover:border-[#19C9E8]/70 dark:hover:border-[#19C9E8]/70 hover:shadow-lg transition-all duration-200 flex flex-col justify-between relative group"
                          >
                            <div>
                              {/* Top Bar inside Card */}
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                  <span className="text-[10px] font-mono font-bold text-[#19C9E8] uppercase tracking-wider block">
                                    SYS.ID: {template.id}
                                  </span>
                                  <h3 
                                    onClick={() => toggleExpanded(template.id)}
                                    className="cursor-pointer font-bold text-sm text-slate-900 dark:text-[#F5F8FC] leading-snug group-hover:text-[#19C9E8] transition-colors mt-0.5"
                                  >
                                    {template.title}
                                  </h3>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0">
                                  {/* Usage Count Pill */}
                                  <Tooltip text={`${copyCount} ${copyCount === 1 ? 'cópia registrada' : 'cópias registradas'}`}>
                                    <div className={cn(
                                      "flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono font-bold transition-all border",
                                      copyCount > 0
                                        ? "bg-[#183B56]/20 dark:bg-[#0B1724] text-[#19C9E8] border-[#183B56]/40 dark:border-[#19C9E8]/30"
                                        : "bg-slate-100 dark:bg-[#0B1724] text-slate-400 border-slate-200 dark:border-[#183B56]"
                                    )}>
                                      <Flame className={cn("w-3 h-3", copyCount > 0 ? "text-[#19C9E8] fill-[#19C9E8]" : "text-slate-400")} />
                                      <span>{copyCount}</span>
                                    </div>
                                  </Tooltip>

                                  {/* Favorite Toggle Button */}
                                  <Tooltip text={isFav ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}>
                                    <button
                                      onClick={(e) => toggleFavorite(template.id, e)}
                                      className={cn(
                                        "p-1.5 rounded-lg transition-all border cursor-pointer",
                                        isFav
                                          ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                                          : "bg-slate-100 dark:bg-[#0B1724] border-slate-200 dark:border-[#183B56] text-slate-400 hover:text-amber-500"
                                      )}
                                    >
                                      <Star className={cn("w-3.5 h-3.5", isFav && "fill-current text-amber-500")} />
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>

                              {/* Preview text or expandable content */}
                              <div className="mt-3">
                                <div className="relative">
                                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-1 px-1">
                                    <span className="flex items-center gap-1">
                                      <Terminal className="w-3 h-3 text-[#19C9E8]" />
                                      Script Operacional
                                    </span>
                                    <button
                                      onClick={() => toggleExpanded(template.id)}
                                      className="hover:text-slate-900 dark:hover:text-[#F5F8FC] flex items-center gap-0.5 cursor-pointer font-sans"
                                    >
                                      <span>{isExpanded ? 'Recolher' : 'Expandir'}</span>
                                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </button>
                                  </div>

                                  <pre className={cn(
                                    "text-xs text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-[#0A1420] p-3.5 rounded-lg font-mono whitespace-pre-wrap leading-relaxed border border-slate-200 dark:border-[#183B56]/80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-[#183B56] transition-all",
                                    isExpanded ? "max-h-72" : "max-h-24 line-clamp-3"
                                  )}>
                                    {template.content}
                                  </pre>
                                </div>
                              </div>
                            </div>

                            {/* Card Action Buttons */}
                            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#183B56]/60 flex items-center justify-between gap-3">
                              <button
                                onClick={() => toggleExpanded(template.id)}
                                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-[#F5F8FC] flex items-center gap-1 font-medium cursor-pointer"
                              >
                                {isExpanded ? (
                                  <>
                                    <span>Recolher</span>
                                    <ChevronUp className="w-3.5 h-3.5" />
                                  </>
                                ) : (
                                  <>
                                    <span>Ver Completo</span>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>

                              {/* Primary Energy Tech Copy Button */}
                              <Tooltip text={isCopied ? "Copiado com Sucesso!" : "Copiar texto para colar no SAP/CRM"}>
                                <button
                                  onClick={() => handleCopy(template.content, template.id)}
                                  className={cn(
                                    "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer",
                                    isCopied
                                      ? "bg-[#A3FF42] text-[#101F30] font-black scale-105 shadow-[0_0_15px_rgba(163,255,66,0.5)]"
                                      : "bg-[#101F30] dark:bg-[#183B56] hover:bg-[#183B56] dark:hover:bg-[#19C9E8] text-[#A3FF42] dark:text-[#A3FF42] dark:hover:text-[#101F30] border border-[#183B56] dark:border-[#19C9E8]/40"
                                  )}
                                >
                                  {isCopied ? (
                                    <>
                                      <CheckCircle2 className="w-4 h-4 text-[#101F30]" />
                                      <span>Copiado!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copiar Script</span>
                                    </>
                                  )}
                                </button>
                              </Tooltip>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* Negotiation Table Component */}
                  {category.showNegotiationTable && <NegotiationTable />}
                </motion.section>
              ))}
          </AnimatePresence>

          {/* Empty Search Results State */}
          {filteredCategories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center relative">
              <div className="w-16 h-16 bg-slate-100 dark:bg-[#13273D] rounded-2xl border border-slate-200 dark:border-[#183B56] flex items-center justify-center text-slate-400 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-[#F5F8FC] uppercase tracking-wider">
                Nenhum script encontrado
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 text-xs leading-relaxed font-sans">
                Não localizamos procedimentos correspondentes ao termo &ldquo;{searchQuery}&rdquo;. Tente buscar por outras palavras-chave ou termos operacionais.
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-6 px-4 py-2 bg-[#183B56] text-[#A3FF42] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#101F30] transition-colors shadow-sm cursor-pointer"
              >
                Limpar Parâmetros de Busca
              </button>
            </div>
          )}

          {/* Corporate Footer */}
          <footer className="pt-8 pb-4 border-t border-slate-200 dark:border-[#183B56]/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#A3FF42]" />
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Texto Padrão — Central de Atendimento Energético
              </span>
              <span>•</span>
              <span className="font-mono text-[11px]">Energy Tech</span>
            </div>
            <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
              DESENVOLVIDO POR // <a href="https://github.com/Rahonne08" target="_blank" rel="noopener noreferrer" className="hover:text-[#19C9E8] transition-colors underline-offset-2">PABLO RAHONNE</a>
            </div>
          </footer>
        </main>
      </div>

      {/* Floating Transfer Confirmation Toast */}
      <AnimatePresence>
        {copiedId && copiedId !== 'email-copy' && copiedId !== 'title-copy' && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.95 }}
            className="fixed bottom-8 left-1/2 z-[100] bg-[#101F30] text-[#F5F8FC] px-6 py-3.5 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3.5 border border-[#19C9E8]/50 backdrop-blur-xl"
          >
            <div className="w-8 h-8 bg-[#A3FF42]/20 border border-[#A3FF42]/40 rounded-lg flex items-center justify-center text-[#A3FF42] shrink-0">
              <Check className="w-4 h-4 text-[#A3FF42]" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-wide text-[#F5F8FC]">SCRIPT TRANSFERIDO COM SUCESSO</p>
              <p className="text-[10px] text-slate-400 font-mono">Texto pronto para colar no SAP / CRM / Ajuri.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#101F30]/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
