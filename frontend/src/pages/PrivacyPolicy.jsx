import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Política de Privacidade
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Última atualização: 18 de novembro de 2025
        </p>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              1. Introdução
            </h2>
            <p>
              O aplicativo <strong>Video +18</strong> ("nós", "nosso" ou "aplicativo") está comprometido em proteger 
              sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e 
              protegemos suas informações quando você usa nosso aplicativo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              2. Informações que Coletamos
            </h2>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              2.1 Informações Fornecidas por Você
            </h3>
            <p className="mb-3">
              Não coletamos informações pessoais identificáveis diretamente de você, como nome ou e-mail.
            </p>
            
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              2.2 Informações Coletadas Automaticamente
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Identificadores de Dispositivo:</strong> ID único do dispositivo para gerenciar assinaturas via Google Play</li>
              <li><strong>Dados de Uso:</strong> Informações sobre como você usa o aplicativo (vídeos assistidos, tempo de uso)</li>
              <li><strong>Dados de Publicidade:</strong> ID de publicidade do Google (GAID) para exibir anúncios personalizados via AdMob</li>
              <li><strong>Informações de Transação:</strong> Dados de compra de assinatura processados pelo Google Play Billing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              3. Como Usamos Suas Informações
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Fornecer e manter o serviço do aplicativo</li>
              <li>Processar pagamentos de assinatura via Google Play Billing</li>
              <li>Exibir anúncios personalizados através do Google AdMob</li>
              <li>Melhorar e personalizar sua experiência no aplicativo</li>
              <li>Analisar uso e tendências para melhorias técnicas</li>
              <li>Cumprir obrigações legais e proteger direitos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              4. Compartilhamento de Informações
            </h2>
            <p className="mb-3">Compartilhamos suas informações com os seguintes terceiros:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Google AdMob:</strong> Para exibir anúncios personalizados</li>
              <li><strong>Google Play Billing:</strong> Para processar pagamentos de assinatura</li>
              <li><strong>RevenueCat:</strong> Para gerenciar assinaturas e verificar status premium</li>
              <li><strong>MongoDB Atlas:</strong> Para armazenar dados de vídeos e configurações</li>
              <li><strong>Railway/Vercel:</strong> Provedores de hospedagem de infraestrutura</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              5. Publicidade e Cookies
            </h2>
            <p className="mb-3">
              Usamos o <strong>Google AdMob</strong> para exibir anúncios. O AdMob pode usar cookies e tecnologias 
              semelhantes para coletar informações sobre seus interesses e exibir anúncios relevantes.
            </p>
            <p className="mb-3">
              Você pode optar por não receber anúncios personalizados nas configurações do seu dispositivo Android:
            </p>
            <p className="ml-4 italic">
              Configurações → Google → Anúncios → Desativar personalização de anúncios
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              6. Retenção de Dados
            </h2>
            <p>
              Retemos suas informações apenas pelo tempo necessário para fornecer o serviço e cumprir 
              obrigações legais. Dados de transação são mantidos conforme exigido pela lei brasileira.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              7. Segurança
            </h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações. 
              No entanto, nenhum método de transmissão pela Internet é 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              8. Direitos do Usuário (LGPD)
            </h2>
            <p className="mb-3">De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Solicitar a eliminação de dados tratados com consentimento</li>
              <li>Revogar consentimento a qualquer momento</li>
              <li>Opor-se ao tratamento de dados</li>
            </ul>
            <p className="mt-3">
              Para exercer seus direitos, entre em contato conosco através do e-mail abaixo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              9. Menores de Idade
            </h2>
            <p>
              Este aplicativo contém conteúdo adulto (+18). Não coletamos intencionalmente informações de 
              menores de 18 anos. Se você é pai/mãe e descobrir que seu filho forneceu dados pessoais, 
              entre em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              10. Alterações nesta Política
            </h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações 
              significativas publicando a nova política no aplicativo. Recomendamos revisar esta página regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              11. Contato
            </h2>
            <p className="mb-3">
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato:
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <p><strong>E-mail:</strong> alternativasolutions3@gmail.com</p>
              <p><strong>Responsável:</strong> Rubens Aguiar</p>
            </div>
          </section>

          <section className="border-t border-gray-300 dark:border-gray-600 pt-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              12. Política de Terceiros
            </h2>
            <p className="mb-3">Links para políticas de privacidade dos serviços de terceiros utilizados:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-blue-600 dark:text-blue-400">
              <li>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Google Play Services & AdMob
                </a>
              </li>
              <li>
                <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  RevenueCat
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
