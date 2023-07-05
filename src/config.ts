const config = {
  mailjet: {
    publicKey: "14eddd003f89e1a052991b3fb2dc9b36",
    privateKey: "97e71dc79643fa24204b1c1717b5a4a9"
  },
  sender: {
    email: "anis@anis.io",
    name: "Anis"
  },
  recipient: {
    email: "anis@safine.me",
    name: "Anis SAFINE LAGET"
  },
  event: {
    name: "XXXXX",
    link: "https://www.klikego.com/revente-dossard/trail-glazig-2022/1352933103191-11?name=&heat-id=1381754030822",
    testFn(data) {
        return data.match(/Racheter ce dossard/i) !== null;
    },
    email: {
        subject: '',
        content: '',
    }
  }
};

config.event.email.subject = `${config.event.name} - Un dossard est disponible !`;
config.event.email.content = `J'ai détecté qu'un dossard était disponible sur la bourse aux dossards de ${config.event.name}. Vérifie sur ${config.event.link}`;

export default config;
