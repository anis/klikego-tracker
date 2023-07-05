import config from './config';
import axios from 'axios';
import * as nodeMailjet from 'node-mailjet';

(async () => {
    try {
        const mailjet = nodeMailjet.connect(
            config.mailjet.publicKey,
            config.mailjet.privateKey,
        );

        const { data } = await axios.get(config.event.link);
        if (config.event.testFn(data)) {
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
                                    Email: config.recipient.email,
                                    Name: config.recipient.name,
                                },
                            ],
                            Subject: config.event.email.subject,
                            TextPart: config.event.email.content,
                        },
                    ],
                });
        }
    } catch (error) {
        console.log('FAILED: ', error);
    }
})();
