import amqplib from 'amqplib';

const QUEUE = 'tasks';
let chan: amqplib.Channel;

(async () => {
    try {
        const conn = await amqplib.connect('amqps://rpkbuktb:FWkmvgnB74fBs8LCkf2lHPoe_SgG2cmZ@albatross.rmq.cloudamqp.com/rpkbuktb');

        chan = await conn.createChannel();
        await chan.assertQueue(QUEUE, { durable: true });

        console.log(`Consuming queue ${QUEUE}`);
        chan.consume(QUEUE, (msg) => {
            if (msg !== null) {
                console.log(`Received: ${msg.content.toString()}`);
                // perform intensive operation
                chan.ack(msg);
            } else {
                console.log('Consumer canceled');
            }
        });
    } catch (e) {
        console.log('Error', e);
    }
})();