import React from 'react'
import Modal from 'react-bootstrap/Modal'


export default function TermsOfUseModal(props) {

    return (
        <Modal show={props.isOpen}
            onHide={props.hideModal}
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title><strong>Termos de uso</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column b-theme-base-color p-2 b-b" style={{ overflowY: "scroll" }}>
                    Os serviços do Napker são fornecidos pela pessoa jurídica OU física com a seguinte Razão Social/nome: *Napker(?)*, com nome fantasia *Napker(?)*, inscrito no CNPJ/CPF sob o nº *PRECISAMOS*, titular da propriedade intelectual sobre software, website, aplicativos, conteúdos e demais ativos relacionados à plataforma Napker.
                    1. Do objeto
                    A plataforma visa licenciar o uso de seu software, website, aplicativos e demais ativos de propriedade intelectual, fornecendo ferramentas para otimizar e auxiliar a vida pessoal de seus usuários.
                    A plataforma caracteriza-se pela prestação do seguinte serviço: Rede social.
                    2. Da aceitação
                    O presente Termo estabelece obrigações contratadas de livre e espontânea vontade, por tempo indeterminado, entre a plataforma e as pessoas físicas ou jurídicas, usuárias do site Napker.
                    Ao utilizar a plataforma o usuário aceita integralmente as presentes normas e compromete-se a observá-las, sob o risco de aplicação das penalidade cabíveis.
                    A aceitação do presente instrumento é imprescindível para o acesso e para a utilização de quaisquer serviços fornecidos pela empresa. Caso não concorde com as disposições deste instrumento, o usuário não deve utilizá-los.
                    3. Do acesso dos usuários
                    Serão utilizadas todas as soluções técnicas à disposição do responsável pela plataforma para permitir o acesso ao serviço 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navegação na plataforma ou em alguma de suas páginas poderá ser interrompida, limitada ou suspensa para atualizações, modificações ou qualquer ação necessária ao seu bom funcionamento.
                    4. Do cadastro
                    O acesso às funcionalidades da plataforma exigirá a realização de um cadastro prévio.
                    Ao se cadastrar o usuário deverá informar dados completos, recentes e válidos, sendo de sua exclusiva responsabilidade manter referidos dados atualizados, bem como o usuário se compromete com a veracidade dos dados fornecidos.
                    O usuário se compromete a não informar seus dados cadastrais e/ou de acesso à plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito.
                    Menores de 18 anos e aqueles que não possuírem plena capacidade civil deverão obter previamente o consentimento expresso de seus responsáveis legais para utilização da plataforma e dos serviços ou produtos, sendo de responsabilidade exclusiva dos mesmos o eventual acesso por menores de idade e por aqueles que não possuem plena capacidade civil sem a prévia autorização.
                    Mediante a realização do cadastro o usuário declara e garante expressamente ser plenamente capaz, podendo exercer e usufruir livremente dos serviços.
                    O usuário deverá fornecer um endereço de e-mail válido, através do qual o site realizará todas comunicações necessárias.
                    Após a confirmação do cadastro, o usuário possuirá um login e uma senha pessoal, a qual assegura ao usuário o acesso individual à mesma. Desta forma, compete ao usuário exclusivamente a manutenção de referida senha de maneira confidencial e segura, evitando o acesso indevido às informações pessoais.
                    Toda e qualquer atividade realizada com o uso da senha será de responsabilidade do usuário, que deverá informar prontamente a plataforma em caso de uso indevido da respectiva senha.
                    Não será permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que é pessoal e intransferível.
                    Caberá ao usuário assegurar que o seu equipamento seja compatível com as características técnicas que viabilize a utilização da plataforma e dos serviços ou produtos.
                    O usuário poderá, a qualquer tempo, requerer o cancelamento de seu cadastro junto ao site Napker. O seu descadastramento será realizado o mais rapidamente possível.
                    O usuário, ao aceitar os Termos e Política de Privacidade, autoriza expressamente a plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informações derivadas do uso dos serviços, do site e quaisquer plataformas, incluindo todas as informações preenchidas pelo usuário no momento em que realizar ou atualizar seu cadastro, além de outras expressamente descritas na Política de Privacidade que deverá ser autorizada pelo usuário.
                    
                    
                    5. Do suporte
                    Em caso de qualquer dúvida, sugestão ou problema com a utilização da plataforma, o usuário poderá entrar em contato com o suporte, através do email napkercontato@gmail.com.
                    Estes serviços de atendimento ao usuário estarão disponíveis a qualquer momento.
                    6. Das responsabilidades
                    É de responsabilidade do usuário:
                    a) defeitos ou vícios técnicos originados no próprio sistema do usuário;
                    b) a correta utilização da plataforma, dos serviços ou produtos oferecidos, prezando pela boa convivência, pelo respeito e cordialidade entre os usuários;
                    c) pelo cumprimento e respeito ao conjunto de regras disposto nesse Termo de Condições Geral de Uso, na respectiva Política de Privacidade e na legislação nacional e internacional;
                    d) pela proteção aos dados de acesso à sua conta/perfil (login e senha).
                    É de responsabilidade da plataforma Napker:
                    a) indicar as características do serviço ou produto;
                    b) os defeitos e vícios encontrados no serviço ou produto oferecido desde que lhe tenha dado causa;
                    c) as informações que foram por ele divulgadas, sendo que os comentários ou informações divulgadas por usuários são de inteira responsabilidade dos próprios usuários;
                    A plataforma não se responsabiliza por links externos contidos em seu sistema que possam redirecionar o usuário à ambiente externo a sua rede.
                    Não poderão ser incluídos links externos ou páginas que sirvam para fins comerciais ou publicitários ou quaisquer informações ilícitas, violentas, polêmicas, pornográficas, xenofóbicas, discriminatórias ou ofensivas.
                    7. Dos direitos autorais
                    O presente Termo de Uso concede aos usuários uma licença não exclusiva, não transferível e não sublicenciável, para acessar e fazer uso da plataforma e dos serviços e produtos por ela disponibilizados.
                    A estrutura do site ou aplicativo, as marcas, logotipos, nomes comerciais, layouts, gráficos e design de interface, imagens, ilustrações, fotografias, apresentações, vídeos, conteúdos escritos e de som e áudio, programas de computador, banco de dados, arquivos de transmissão e quaisquer outras informações e direitos de propriedade intelectual da razão social Napker, observados os termos da Lei da Propriedade Industrial (Lei nº 9.279/96), Lei de Direitos Autorais (Lei nº 9.610/98) e Lei do Software (Lei nº 9.609/98), estão devidamente reservados.
                    Este Termos de Uso não cede ou transfere ao usuário qualquer direito, de modo que o acesso não gera qualquer direito de propriedade intelectual ao usuário, exceto pela licença limitada ora concedida.
                    O uso da plataforma pelo usuário é pessoal, individual e intransferível, sendo vedado qualquer uso não autorizado, comercial ou não-comercial. Tais usos consistirão em violação dos direitos de propriedade intelectual da razão social Napker, puníveis nos termos da legislação aplicável.
                    8. Das sanções
                    Sem prejuízo das demais medidas legais cabíveis, a razão social Napker poderá, a qualquer momento, advertir, suspender ou cancelar a conta do usuário:
                    a) que violar qualquer dispositivo do presente Termo;
                    b) que descumprir os seus deveres de usuário;
                    c) que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros.
                    9. Da rescisão
                    A não observância das obrigações pactuadas neste Termo de Uso ou da legislação aplicável poderá, sem prévio aviso, ensejar a imediata rescisão unilateral por parte da razão social Napker e o bloqueio de todos os serviços prestados ao usuário.
                    10. Das alterações
                    Os itens descritos no presente instrumento poderão sofrer alterações, unilateralmente e a qualquer tempo, por parte de Napker, para adequar ou modificar os serviços, bem como para atender novas exigências legais. As alterações serão veiculadas pelo site Napker e o usuário poderá optar por aceitar o novo conteúdo ou por cancelar o uso dos serviços.
                    11. Da política de privacidade
                    Além do presente Termo, o usuário deverá consentir com as disposições contidas na respectiva Política de Privacidade a ser apresentada a todos os interessados dentro da interface da plataforma.
                    12. Do foro
                    Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o Direito brasileiro.
                    Os eventuais litígios deverão ser apresentados no foro da comarca em que se encontra a sede da empresa.

                </div>
            </Modal.Body>
        </Modal>
    )
}