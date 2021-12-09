import * as config from './config.json';
import axios from 'axios';
import * as nodeMailjet from 'node-mailjet';

(async () => {
    try {
        const mailjet = nodeMailjet.connect(
            config.mailjet.publicKey,
            config.mailjet.privateKey,
        );

        const { data } = await axios.get(config.event.link);
        if (data.match(/Pas de chance/i) === null) {
            await mailjet
                .post('send', { version: 'v3.1' })
                .request({
                    Messages: [
                        {
                            From: {
                                Email: config.sender.email,
                                Name: config.sender.name,
                            },
                            To: [
                                {
                                    Email: config.sender.email,
                                    Name: config.sender.name,
                                },
                            ],
                            Subject: `${config.event.name} - Un dossard est disponible !`,
                            TextPart: `J'ai détecté qu'un dossard était disponible sur la bourse aux dossards de ${config.event.name}. Vérifie sur ${config.event.link}`,
                        },
                    ],
                });
        }
    } catch (error) {
        console.log('FAILED: ', error);
    }
})();
