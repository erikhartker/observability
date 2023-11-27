const { Resource } = require("@opentelemetry/resources");
const { SemanticResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { trace } = require("@opentelemetry/api");
//Instrumentations
const { ExpressInstrumentation } = require("opentelemetry-instrumentation-express");
const { MongoDBInstrumentation } = require("@opentelemetry/instrumentation-mongodb");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');

const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

// module.exports = (serviceName) => {
//     const options = {
//     tags: [], // optional
//     // You can use the default UDPSender
//     host: 'localhost', // optional
//     port: 3000, // optional
//     // OR you can use the HTTPSender as follows
//     // endpoint: 'http://localhost:14268/api/traces',
//     maxPacketSize: 65000 // optional
//     }
//     const exporter = new JaegerExporter(options);
//     const provider = new NodeTracerProvider();
//     provider.addSpanProcessor(new BatchSpanProcessor(exporter));
//     provider.register();
//     return provider.getTracer("todo-service");
// };


// const options = {
//   serviceName: 'todo-service',
//   tags: [], // optional
//   // You can use the default UDPSender
//   host: 'localhost', // optional
//   port: 3000, // optional
//   // OR you can use the HTTPSender as follows
//   // endpoint: 'http://localhost:14268/api/traces',
//   maxPacketSize: 65000 // optional
// }
// const exporter = new JaegerExporter(options);
// const provider = new NodeTracerProvider({
//     resource: new Resource({
//         [SemanticResourceAttributes.SERVICE_NAME]: 'todo-service',
//     }),
// });
// provider.addSpanProcessor(new BatchSpanProcessor(exporter));
// provider.register();
// registerInstrumentations({
//     instrumentations: [
//         new HttpInstrumentation(),
//         new ExpressInstrumentation(),
//         new MongoDBInstrumentation(),
//     ],
//     tracerProvider: provider,
// });
// module.exports = trace.getTracer('todo-service');


//Exporter
// module.exports = (serviceName) => {
//    const exporter = new ConsoleSpanExporter();
//    const provider = new NodeTracerProvider({
//        resource: new Resource({
//            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
//        }),
//    });
//    provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
//    provider.register();
//    registerInstrumentations({
//        instrumentations: [
//            new HttpInstrumentation(),
//            new ExpressInstrumentation(),
//            new MongoDBInstrumentation(),
//        ],
//        tracerProvider: provider,
//    });
//    return trace.getTracer(serviceName);
// };

//Exporter
module.exports = (serviceName) => {
    const options = {
        serviceName: serviceName,
        tags: [], // optional
        // You can use the default UDPSender
        host: 'localhost', // optional
        //port: 3000, // optional
        // OR you can use the HTTPSender as follows
        // endpoint: 'http://localhost:14268/api/traces',
        //maxPacketSize: 65000 // optional
      }
   const exporter = new JaegerExporter(options);
   const provider = new NodeTracerProvider({
       resource: new Resource({
           [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
       }),
   });
   provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
   provider.register();
   registerInstrumentations({
       instrumentations: [
           new HttpInstrumentation(),
           new ExpressInstrumentation(),
           new MongoDBInstrumentation(),
       ],
       tracerProvider: provider,
   });
   return trace.getTracer(serviceName);
};