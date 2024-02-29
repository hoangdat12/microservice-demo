// import * as amqp from 'amqplib';
// import { BadRequestError } from '../core/error.response.js';
// import AddressService from '../services/address.service.js';

// /**
//  * Interface IMsg {
//  * type: ''
//  * data:
//  * }
//  */

// class Consumer {
//   static channel;
//   constructor(queue = 'user_queue') {
//     this.queue = queue;
//   }

//   async connection() {
//     const conn = await amqp.connect('amqp://localhost:5672');
//     Consumer.channel = await conn.createChannel();
//   }

//   async receivedMessage() {
//     if (!Consumer.channel) {
//       await this.connection();
//     }
//     await Consumer.channel.assertQueue(this.queue, {
//       durable: false,
//     });
//     Consumer.channel.prefetch(1);
//     Consumer.channel.qos(100);
//     Consumer.channel.consume(
//       this.queue,
//       async (msg) => {
//         if (msg) {
//           const { type, data } = JSON.parse(msg.content.toString());
//           switch (type) {
//             case 'createAddress':
//               await AddressService.addAddress({
//                 data,
//               });
//               break;

//             // Delete product after order
//             case 'defaultAddress':
//               await AddressService.defaultAddress({
//                 userId: data.userId,
//                 address_id: data.address_id,
//               });
//               break;
//             default:
//               console.log('Not valid!');
//               throw new BadRequestError('Type of Message not valid!');
//           }
//         }
//         Consumer.channel.ack(msg);
//       },
//       {
//         noAck: false,
//       }
//     );
//   }
// }

// export default Consumer;
