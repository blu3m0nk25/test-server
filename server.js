const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const { status, domain, emails } = req.query;
    console.log(`Status: ${status}, Domain: ${domain}`);
    if (status === 'session_expired') {
        res.status(200).send('Session expiration recorded');
    } else if (status === 'ok' && emails) {
        try {
            const decodedEmails = Buffer.from(emails, 'base64').toString('utf-8');
            console.log(`Emails: ${decodedEmails}`);
            res.status(200).send('Emails received successfully');
        } catch (error) {
            res.status(400).send('Invalid email data');
        }
    } else {
        res.status(400).send('Bad request');
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
