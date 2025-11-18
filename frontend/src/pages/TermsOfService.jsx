import { useEffect } from 'react';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Termos de Serviço
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Última atualização: 18 de novembro de 2025
        </p>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e usar o aplicativo <strong>Video +18</strong>, você concorda em cumprir estes 
              Termos de Serviço. Se você não concorda, não use o aplicativo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Conteúdo Adulto (+18)
            </h2>
            <p className="mb-3">
              Este aplicativo contém <strong>conteúdo exclusivo para maiores de 18 anos</strong>. Ao usar o aplicativo, 
              você declara e garante que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Você tem 18 anos ou mais</li>
              <li>Está legalmente autorizado a visualizar conteúdo adulto em sua jurisdição</li>
              <li>Não ficará ofendido pelo conteúdo adulto</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Descrição do Serviço
            </h2>
            <p>
              O <strong>Video +18</strong> fornece acesso diário a um vídeo de conteúdo adulto. 
              O conteúdo é atualizado regularmente e está disponível para streaming gratuito. 
              Recursos premium (download) estão disponíveis através de assinatura paga.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. Assinatura Premium
            </h2>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              4.1 Plano e Pagamento
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-3">
              <li>Plano mensal: R$ 1,99/mês</li>
              <li>Pagamento processado via Google Play Billing</li>
              <li>Renovação automática até cancelamento</li>
            </ul>
            
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              4.2 Cancelamento
            </h3>
            <p className="mb-3">
              Você pode cancelar sua assinatura a qualquer momento através das configurações 
              da Google Play Store. O acesso premium permanecerá ativo até o fim do período pago.
            </p>
            
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              4.3 Reembolso
            </h3>
            <p>
              Reembolsos seguem a política da Google Play Store. Pagamentos via Google Play 
              são elegíveis para reembolso dentro de 48 horas da compra inicial.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Uso Aceitável
            </h2>
            <p className="mb-3">Você concorda em NÃO:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Compartilhar, redistribuir ou revender o conteúdo do aplicativo</li>
              <li>Fazer engenharia reversa ou tentar acessar o código-fonte</li>
              <li>Usar o aplicativo para fins ilegais ou não autorizados</li>
              <li>Violar direitos de propriedade intelectual</li>
              <li>Tentar contornar limitações técnicas ou de segurança</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo disponibilizado no aplicativo, incluindo vídeos, textos, gráficos e 
              logotipos, é propriedade do <strong>Video +18</strong> ou de seus licenciadores. 
              Você recebe apenas uma licença limitada e não exclusiva para visualizar o conteúdo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Publicidade
            </h2>
            <p>
              O aplicativo exibe anúncios através do Google AdMob. Os anúncios são fornecidos 
              por terceiros e não endossamos ou nos responsabilizamos pelo conteúdo dos anúncios.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Disponibilidade do Serviço
            </h2>
            <p>
              Nos esforçamos para manter o aplicativo disponível 24/7, mas não garantimos 
              disponibilidade ininterrupta. Podemos suspender, modificar ou descontinuar o 
              serviço a qualquer momento sem aviso prévio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Isenção de Responsabilidade
            </h2>
            <p className="mb-3">
              O APLICATIVO É FORNECIDO "COMO ESTÁ" E "CONFORME DISPONÍVEL". NÃO GARANTIMOS QUE:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>O serviço será ininterrupto, seguro ou livre de erros</li>
              <li>Os resultados obtidos serão precisos ou confiáveis</li>
              <li>A qualidade do conteúdo atenderá suas expectativas</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10. Limitação de Responsabilidade
            </h2>
            <p>
              Em nenhuma circunstância seremos responsáveis por danos indiretos, incidentais, 
              especiais, consequenciais ou punitivos, incluindo perda de lucros, dados ou uso, 
              resultantes do uso ou incapacidade de usar o aplicativo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              11. Modificações dos Termos
            </h2>
            <p>
              Reservamo-nos o direito de modificar estes Termos a qualquer momento. 
              Alterações significativas serão notificadas através do aplicativo. O uso 
              continuado após as alterações constitui aceitação dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              12. Lei Aplicável
            </h2>
            <p>
              Estes Termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida 
              nos tribunais competentes do Brasil.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              13. Contato
            </h2>
            <p className="mb-3">
              Para questões sobre estes Termos de Serviço, entre em contato:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p><strong>E-mail:</strong> alternativasolutions3@gmail.com</p>
              <p><strong>Responsável:</strong> Rubens Aguiar</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
