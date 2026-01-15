const { withAndroidManifest, withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withNetworkSecurity = (config) => {
  // Primeiro, garantir que o AndroidManifest tenha as configurações corretas
  config = withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const { manifest } = androidManifest;

    if (!manifest.application) {
      return config;
    }

    const application = manifest.application[0];
    
    // Garantir que usesCleartextTraffic está definido
    if (!application.$) {
      application.$ = {};
    }
    application.$['android:usesCleartextTraffic'] = 'true';
    
    // Garantir que networkSecurityConfig está definido
    if (!application.$['android:networkSecurityConfig']) {
      application.$['android:networkSecurityConfig'] = '@xml/network_security_config';
    }

    return config;
  });

  // Segundo, garantir que o arquivo network_security_config.xml existe
  config = withDangerousMod(config, [
    'android',
    async (config) => {
      const xmlPath = path.join(
        config.modRequest.platformProjectRoot,
        'app/src/main/res/xml/network_security_config.xml'
      );
      
      const xmlDir = path.dirname(xmlPath);
      if (!fs.existsSync(xmlDir)) {
        fs.mkdirSync(xmlDir, { recursive: true });
      }

      const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <!-- Permitir HTTP para todas as conexões -->
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
    
    <!-- Configuração específica para o domínio da API -->
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">ec2-18-219-222-98.us-east-2.compute.amazonaws.com</domain>
        <domain includeSubdomains="true">localhost</domain>
        <domain includeSubdomains="true">10.0.2.2</domain>
        <domain includeSubdomains="true">192.168.0.0/16</domain>
        <domain includeSubdomains="true">10.0.0.0/8</domain>
        <domain includeSubdomains="true">172.16.0.0/12</domain>
    </domain-config>
</network-security-config>`;

      fs.writeFileSync(xmlPath, xmlContent, 'utf8');
      return config;
    },
  ]);

  return config;
};

module.exports = withNetworkSecurity;
