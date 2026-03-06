'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  X,
  Info,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    info: 'Na aba “ Meios de comunicação: Caso cliente não tenha e-mail ou não queira informar, como campo é obrigatório, preencher campo de e-mail com: naoinformado@equatorialenergia.com.br\n\nIMPORTANTE: Salvar arquivo como “Carta de Deferimento assinada_CC XXXX”',
    templates: [
      {
        id: 'padrao-completo',
        title: 'Com Padrão Completo Pronto',
        content: 'COORD. GEOGRÁFICAS: XXXXXX\nPONTO DE REFERÊNCIA: XXXXXX\nANÁLISE DUP CADASTRO? NÃO\nPADRÃO INSTALADO EXTERNAMENTE? SIM\nCHECKLIST PADRÃO MONTADO ASSINADO PELO CLIENTE? SIM\nPOSSUI REDE ELÉTRICA PROX. AO IMÓVEL? SIM\nTELEFONE: XXXXXX\nWHATSAPP: XXXXXX\nE-MAIL VÁLIDO: XXXXXX\nENDEREÇO DA CONEXÃO É O MESMO ENDEREÇO DE CORRESPONDÊNCIA? SIM ENDEREÇO CORRESPONDÊNCIA: XXXXXX *CLIENTE VEIO AO ATENDIMENTO E SOLICITOU CONEXÃO. CIENTE DO PRAZO DE VISTORIA E QUE, EM CASO DE PADRÃO INCOMPLETO/INEXISTENTE, SEU PEDIDO SERÁ REJEITADO. **ANEXO DOC. DO SOLICITANTE E FORMULÁRIO DE CONEXÃO ASSINADO.'
      },
      {
        id: 'financiamento-padrao',
        title: 'Com Financiamento de Padrão',
        content: 'COORD. GEOGRÁFICAS: XXXXXX;\nPONTO DE REFERÊNCIA: XXXXXX\nANÁLISE DUP CADASTRO? NÃO\nPADRÃO FINANCIADO: FPC5 OU PFC7\nPARCELADO: XXx R$ XX\nLOCAL DEMARCADO: SIM OU NÃO (DESCREVER O LOCAL)\nLIG. EM PRAÇA PÚBLICA?\nAUTORIZAÇÃO BLITZ URBANA?\nNÃO POSSUI REDE PROX. AO IMÓVEL? SIM\nTELEFONE: XXXXXX\nWHATSAPP: XXXXXX\nE-MAIL VÁLIDO: XXXXXX\nENDEREÇO DA CONEXÃO É O MESMO ENDEREÇO De CORRESPONDÊNCIA? SIM ENDEREÇO CORRESPONDÊNCIA: XXXXXX ASSINOU FORMULÁRIO DE FINANC. DE PADRÃO? SIM *CLIENTE VEIO AO ATENDIMENTO E SOLICITOU CONEXÃO COM FINANCIAMENTO DE PADRÃO. CIENTE DO PRAZO DE VISTORIA. **ANEXO DOC. DO SOLICITANTE, FORMULÁRIO DE CONEXÃO E FORMULÁRIO DE FINACIAMENTO DE PADRÃO ASSINADOS.'
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
        content: 'CLIENTE: SR. JOÃO SOUZA\nRG: XXX\nCPF: XXX.XXX.XXX-XX\nSOLICITAÇÃO: TROCA DE TITULARIDADE DA INSTALAÇÃO XXXXX, ATUALMENTE EM NOME DE MARIA SILVA.\nMOTIVO DA TROCA:\nDATA DE OCUPAÇÃO:\nDÉBITOS NA INSTALAÇÃO: ( ) SIM – VALOR: ( ) NÃO\nOBSERVAÇÕES:\nTROCA DE TITULARIDADE REALIZADA SEM DOCUMENTO DE POSSE OU PROPRIEDADE, SOMENTE\nEM CASOS QUE NÃO TEM DEBITOS NA CC\nCONFORME PREVISTO NO INFORMATIVO 029/2025'
      },
      {
        id: 'analise-troca',
        title: 'Análise de Troca de Titularidade',
        content: 'FAVOR REALIZAR A TROCA DE TITULARIDADE DA CC XXXXX QUE SE ENCONTRA EM NOME DE MARIA DO SOCORRO BRITO SILVA PARA O NOME DO NOVO TITULAR MIGUELA VAZ ALMEIDA RG XXX CPF XXXX\nMOTIVO DA TROCA:\nDOCUMENTAÇÃO APRESENTADA:\nDATA DE VIGÊNCIA:\nCLASSE DE CONSUMO:\nSTATUS DA INSTALAÇÃO: LIGADA ( ) CORTADA ( ) DESLIGADA ( )\nOBSERVAÇÕES: SE HOUVER'
      },
      {
        id: 'com-transferencia-debitos',
        title: 'Com Transferência de Débitos',
        content: 'DIRECIONADO PARA TRATAMENTO DA CÉLULA DE APOIO - TROCA COM TRANSFERÊNCIA E PARCELAMENTO.\nFAVOR REALIZAR A TROCA DE TITULARIDADE COM TRANSFERÊNCIA E PARCELAMENTO DOS DÉBITOS DA CC 3007995368 QUE SE ENCONTRA EM NOME DE JOSE MAMEDE RODRIGUES FERREIRA PARA O NOME DO NOVO TITULAR AILTON SILVA ARAÚJO RG XXX CPF XXX AUTORIZADO PELO SOLICITANTE MEDIANTE ASSINATURA DOS TERMOS DTT, TATD, TCD E ADITIVO DE PARCELAMENTO ANEXO DENTRO DA NOTA.\nSIMULAÇÃO DE PARCELAMENTO:\nENTRADA:\nPARCELAS: 18'
      }
    ]
  },
  {
    id: 'parcelamento',
    name: 'Parcelamento',
    icon: <Banknote className="w-5 h-5" />,
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
        content: 'Script da Reclamação:\nDESCRIÇÃO DA RECLAMAÇÃO:\nANALISE DO ATENDENTE:\nREMEDIAÇÃO PRETENDIDA\nMEIO DE RESPOSTA: CARTA ( ) TELEFONE ( ) E-MAIL ( )\nDESCRIÇÃO DO MEIO DE RESPOSTA:\nAUTORIZA TERCEIROS: SIM ( ) NÃO ( )'
      },
      {
        id: 'erro-leitura',
        title: 'Erro de Leitura',
        content: 'DESCRIÇÃO DA RECLAMAÇÃO: ***** RECLAMA DO VALOR DA CONTA DE ENERGIA POIS AFIRMA QUE LEITURA ESTA ERRADA.\nREMEDIAÇÃO PRETENDIDA: REFORMULAR A FATURA PARA O VALOR CONFORME A LEITURA APRESENTADA COM FOTO DO MEDIDOR.\nANÁLISE DO ATENDENTE: LEITURA CORRETA CONFIRMADA COM FOTO 3207 E ANEXADA NA NOTA DA RECLAMAÇÃO. QUANTIDADE DE KWH A SER COBRADO: 3132 (LEITURA ANTERIOR) - 3262 (LEITURA ATUAL) = 75 KWH QUE DEVEM SER FATURADOS NA COMPETENCIA 05/2022. APONTAMENTO DO LEITURISTA NORMAL. CÓDIGO PARA REFATURAMENTO 71.\nMEIO DE RESPOSTA DA RECLAMAÇÃO: TELEFONE ( ) CARTA ( X ) E-MAIL ( )\nAUTORIZA TERCEIROS: SIM ( ) NÃO (X)\nTELEFONE PARA CONTATO:\nINFORMAÇÕES COMPLEMENTARES: 05/2022 - 132,93 VENCIMENTO 18/05/2022. LEITURA APRESENTADA 3207.\nEM CASO DE CORREÇÃO DA CONTA RECLAMADA, CLIENTE AUTORIZA ENVIO DA FATURA VIA WHATSAPP: SIM ( ) NÃO ( X )'
      },
      {
        id: 'cnr',
        title: 'CNR',
        content: 'RECLAMAÇÃO: *** RECLAMA DA FATURA DE COMPETENCIA **/20**- R$**,** VENCIMENTO **/**/2022, POIS NÃO CONCORDA COM O VALOR COBRADO REFERENTE A CONSUMO NÃO REGISTRADO.\nSOLUÇÃO PRETENDIDA: DESTA FORMA, CLIENTE DESEJA QUE A FATURA SEJA CANCELADA E APRESENTOU A CARTA DE DEFESA E CONSTA EM ANEXO.\nFORMA DE RETORNO: CLIENTE DESEJA RECEBER RESPOSTA POR MEIO DE CARTA DISPONIBILIZADA NA AGÊNCIA DE ATENDIMENTO.\nAUTORIZAÇÃO DE TERCEIROS: NÃO AUTORIZA TERCEIROS A RECEBER RESPOSTA EM CASO DE AUSÊNCIA.TELEFONE PARA CONTATO:'
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
        content: 'SOLICITADO O PEDIDO DE AFERIÇÃO POR ÓRGÃO METROLÓGICO, COM A DEVIDA\nANUÊNCIA DA SUPERVISÃO. CLIENTE XXX, TITULAR DA CC XXXX ESTÁ CIENTE DA TAXA\nDE COBRANÇA. O DOCUMENTO EM ANEXO FOI DEVIDAMENTE PREENCHIDO, DATADO E\nASSINADO.'
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
        content: '***** VEIO AO ATENDIMENTO COM RG E CPF INFORMAR FALTA DE ENERGIA AFETANDO SOMENTE SUA CASA, CLIENTE INFORMA QUE JÁ REALIZOU O TESTE NO DISJUNTOR E NÃO OBTEVE RESULTADOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'falta-energia-geral',
        title: 'Falta de Energia Geral',
        content: '*** VEIO AO ATENDIMENTO COM RG E CPF INFORMAR FALTA DE ENERGIA AFETANDO SUA CASA E OUTRAS RESIDÊNCIAS DA LOCALIDADE CLIENTE INFORMA QUE JÁ REALIZOU O TESTE NO DISJUNTOR E NÃO OBTEVE RESULTADOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'choque-vazamento',
        title: 'Choque e Vazamento',
        content: '**** VEIO AO ATENDIMENTO INFORMAR CHOQUE E VAZAMENTO DE ENERGIA, FAVOR EQUIPE REGULARIZAR A SITUAÇÃO NEUTRALIZANDO RISCOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'ramal-partido',
        title: 'Rede ou Ramal Partido',
        content: '**** VEIO AO ATENDIMENTO INFORMA QUE CABO PARTIDO, FAVOR EQUIPE REGULARIZAR A SITUAÇÃO NEUTRALIZANDO RISCOS.\nPONTO DE REFERÊNCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'falta-fase',
        title: 'Falta de Fase',
        content: '*** VEIO AO ATENDIMENTO INFORMAR FALTA DE FASE, O MESMO SOLICITA AVALIAÇÃO E A NORMALIZAÇÃO DO SEU FORNECIMENTO DE ENERGIA.\nPONTO DE REFERENCIA:\nTELEFONE PARA CONTATO:'
      },
      {
        id: 'avaliacao-tecnica',
        title: 'Avaliação Técnica',
        content: '**** VEIO AO ATENDIMENTO INFORMAR QUE ESTÁ COM OSCILAÇÕES FREQUENTES, A MENOS DE 7 DIAS, INFORMA QUE O HORÁRIO EM QUE MAIS TEM OSCILAÇÕES É NA PARTE DA XXXXXXX E O HORÁRIO MAIS FREQUENTE É XXXX\nPONTO DE REFERENCIA:\nTELEFONE PARA CONTATO:'
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

export default function TemplateGenerator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

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

  const filteredCategories = useMemo(() => {
    let categories = SERVICE_CATEGORIES;

    if (selectedCategory === 'favorites') {
      const allTemplates = SERVICE_CATEGORIES.flatMap(cat => cat.templates);
      const favoriteTemplates = allTemplates.filter(t => favorites.includes(t.id));
      
      return [{
        id: 'favorites',
        name: 'Meus Favoritos',
        icon: <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />,
        templates: favoriteTemplates.filter(template => 
          !searchQuery || 
          template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      } as Category].filter(cat => cat.templates.length > 0);
    }

    if (!searchQuery) return categories;

    return categories.map(category => ({
      ...category,
      templates: category.templates.filter(template => 
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.templates.length > 0);
  }, [searchQuery, favorites, selectedCategory]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-screen bg-[#F1F5F9] dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 flex overflow-hidden transition-colors duration-500">
      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-blue-900/50 transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col h-full",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 dark:border-blue-900/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
                <ClipboardList className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight dark:text-white">TEXTOS PADRÕES ATENDIMENTO LESTE</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-blue-800 scrollbar-track-transparent hover:scrollbar-thumb-slate-400 dark:hover:scrollbar-thumb-blue-700 transition-colors">
            <button
              onClick={() => handleCategorySelect(null)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                selectedCategory === null 
                  ? "bg-indigo-50 dark:bg-blue-800/40 text-indigo-600 dark:text-blue-300" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-blue-800/30 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              <FileText className="w-4 h-4" />
              Todos os Serviços
            </button>

            <button
              onClick={() => handleCategorySelect('favorites')}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                selectedCategory === 'favorites' 
                  ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400" 
                  : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-blue-800/30 hover:text-slate-700 dark:hover:text-slate-200"
              )}
            >
              <Heart className={cn("w-4 h-4", selectedCategory === 'favorites' && "fill-current")} />
              Meus Favoritos
            </button>
            
            <div className="pt-4 pb-2 px-4">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Serviços</span>
            </div>

            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all",
                  selectedCategory === cat.id 
                    ? "bg-indigo-50 dark:bg-blue-800/40 text-indigo-600 dark:text-blue-300" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-blue-800/30 hover:text-slate-700 dark:hover:text-slate-200"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  selectedCategory === cat.id 
                    ? "bg-indigo-100 dark:bg-blue-700/40" 
                    : "bg-slate-100 dark:bg-blue-900/50"
                )}>
                  {cat.icon}
                </div>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-blue-900/50 shrink-0">
            <div className="bg-slate-50 dark:bg-blue-900/30 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Dica</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Use a busca no topo para encontrar templates específicos por palavras-chave.
              </p>
            </div>
            <div className="text-center py-2 border-t border-slate-100 dark:border-blue-900/50">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                DESENVOLVIDO POR PABLO RAHONNE
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#020617]/80 backdrop-blur-md border-b border-slate-200 dark:border-blue-900/50 transition-colors duration-500">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-blue-900/50 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="relative flex-1 min-w-[200px] max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Buscar em todos os templates..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-blue-900/40 border-transparent focus:bg-white dark:focus:bg-blue-800/60 focus:ring-2 focus:ring-indigo-500 rounded-xl text-sm transition-all outline-none dark:text-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-blue-900/50 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-blue-800 transition-all"
                title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                )}
              </button>

              <div className="hidden sm:flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">TEXTOS PADRÕES ATENDIMENTO LESTE</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider">Base de Templates</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-blue-900/50 border-2 border-white dark:border-blue-800 shadow-sm flex items-center justify-center text-slate-500 dark:text-slate-400">
                  <Activity className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-10 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-blue-900 transition-colors duration-500">
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
                    <div className="w-12 h-12 bg-white dark:bg-[#0f172a] rounded-2xl flex items-center justify-center text-indigo-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-blue-900/50 transition-colors duration-500">
                      {category.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">{category.name}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{category.templates.length} templates disponíveis</p>
                    </div>
                  </div>

                  {category.info && (
                    <div className="bg-indigo-50 dark:bg-blue-900/20 border border-indigo-100 dark:border-blue-900/50 rounded-2xl p-4 flex items-start gap-3">
                      <Info className="w-5 h-5 text-indigo-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-indigo-800 dark:text-blue-200 leading-relaxed whitespace-pre-wrap">
                        {category.info}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {category.templates.map((template) => (
                      <motion.div
                        key={template.id}
                        layoutId={template.id}
                        className="group bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-blue-900/50 rounded-3xl p-6 hover:border-indigo-300 dark:hover:border-blue-500 hover:shadow-2xl hover:shadow-indigo-100/50 dark:hover:shadow-blue-900/20 transition-all duration-300 flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className="space-y-1">
                            <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-tight group-hover:text-indigo-600 dark:group-hover:text-blue-400 transition-colors">
                              {template.title}
                            </h3>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">ID: {template.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => toggleFavorite(template.id, e)}
                              className={cn(
                                "p-3 rounded-2xl transition-all shadow-sm",
                                favorites.includes(template.id)
                                  ? "bg-rose-50 dark:bg-rose-900/30 text-rose-500"
                                  : "bg-slate-50 dark:bg-blue-900/50 text-slate-400 dark:text-slate-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-400"
                              )}
                              title={favorites.includes(template.id) ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
                            >
                              <Heart className={cn("w-5 h-5", favorites.includes(template.id) && "fill-current")} />
                            </button>
                            <button
                              onClick={() => handleCopy(template.content, template.id)}
                              className={cn(
                                "shrink-0 p-3 rounded-2xl transition-all shadow-sm",
                                copiedId === template.id 
                                  ? "bg-emerald-500 text-white scale-110" 
                                  : "bg-slate-50 dark:bg-blue-900/50 text-slate-400 dark:text-slate-500 group-hover:bg-indigo-600 dark:group-hover:bg-blue-600 group-hover:text-white"
                              )}
                            >
                              {copiedId === template.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        
                        <div className="relative flex-1 group/pre">
                          <div className="absolute top-3 right-3 opacity-0 group-hover/pre:opacity-100 transition-opacity">
                            <div className="bg-white/80 dark:bg-blue-900/80 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-blue-800">
                              Conteúdo do Template
                            </div>
                          </div>
                          <pre className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50/80 dark:bg-blue-900/30 p-5 rounded-2xl font-mono whitespace-pre-wrap leading-relaxed border border-slate-100 dark:border-blue-900/50 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-blue-800 transition-colors duration-500">
                            {template.content}
                          </pre>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-50 dark:border-blue-900/50 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-6 h-6 rounded-full bg-slate-100 dark:bg-blue-900/50 border-2 border-white dark:border-blue-950" />
                            ))}
                          </div>
                          <button 
                            onClick={() => handleCopy(template.content, template.id)}
                            className="text-xs font-bold text-indigo-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all"
                          >
                            Copiar Agora
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ))}
          </AnimatePresence>

          {filteredCategories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-24 h-24 bg-white dark:bg-[#0f172a] rounded-3xl shadow-sm border border-slate-200 dark:border-blue-900/50 flex items-center justify-center text-slate-300 dark:text-slate-700 mb-6 transition-colors duration-500">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Nenhum template encontrado</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2">Não encontramos nenhum serviço ou conteúdo correspondente a &quot;{searchQuery}&quot;. Tente buscar por termos mais genéricos.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 dark:shadow-blue-900/20 hover:bg-indigo-700 transition-all"
              >
                Limpar busca
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
            className="fixed bottom-10 left-1/2 z-[100] bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Copiado com sucesso!</p>
              <p className="text-[10px] text-slate-400 dark:text-blue-100 font-medium uppercase tracking-wider">Pronto para colar no sistema</p>
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
