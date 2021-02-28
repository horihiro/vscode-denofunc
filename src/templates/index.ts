'use strict';

export const functionTemplates = [{
  label: 'Blob Trigger',
  template: `import { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  const myBlob = context.bindings.myBlob;
  context.log(\`Blob trigger function processed blob 
  Name: $\{context.bindingData.name}, 
  Blob Size: $\{myBlob.length} Bytes\`);
}

export default {
  handler,

  // Name of the function
  name: "blob_trigger",

  metadata: {
    "bindings": [
      {
        // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-trigger?tabs=javascript#configuration
        "name": "myBlob",
        "type": "blobTrigger",
        "direction": "in",
        "path": "samples-workitems/{name}",
        "connection": "AzureWebJobsStorage"
      }
    ],
  },
};
`}, {
  label: 'CosmosDB Trigger',
  template: `import { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  const documents = context.bindings.documents;
  if (!!documents && documents.length > 0) {
    context.log(\`Document Id: $\{documents[0].id}\`);
  }
}

export default {
  handler,

  // Name of the function
  name: "cosmosdb_trigger",

  metadata: {
    "bindings": [
      {
        // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-trigger?tabs=csharp#configuration
        "type": "cosmosDBTrigger",
        "name": "documents",
        "direction": "in",
        "leaseCollectionName": "LEASE_COLLECTION_NAME",
        "connectionStringSetting": "CosmosDBConnection",
        "databaseName": "DB_NAME",
        "collectionName": "COLLECTION_NAME",
        "createLeaseCollectionIfNotExists": "true"
      }
    ],
  },
};
`}, {
  label: 'EventGrid Trigger',
  template: `import { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  const eventGridEvent = context.bindings.eventGridEvent;
  context.log(typeof eventGridEvent);
  context.log(eventGridEvent);
}

export default {
  handler,

  // Name of the function
  name: "eventgrid_trigger",

  metadata: {
    "bindings": [
      {
        // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-grid-trigger?tabs=csharp#configuration
        "type": "eventGridTrigger",
        "name": "eventGridEvent",
        "direction": "in",
      },
    ],
  },
};
`}, {
  label: 'EventHubs/IoT Hub Trigger',
  template: `import { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  const eventHubMessages = context.bindings.eventHubMessages;
  context.log(
    \`Eventhub trigger function called for message array $\{eventHubMessages}\`,
  );

  eventHubMessages.forEach((message: any) => {
    context.log(\`Processed message $\{message}\`);
  });
}

export default {
  handler,

  // Name of the function
  name: "eventhub_iothub_trigger",

  metadata: {
    "bindings": [
      {
        // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-trigger?tabs=csharp#configuration
        "type": "eventHubTrigger",
        "name": "eventHubMessages",
        "direction": "in",
        "eventHubName": "samples-workitems",
        "connection": "EventHubConnection",
        "cardinality": "many",
        "consumerGroup": "$Default",
      },
    ],
  },
};
`}, {
  label: 'HTTP Trigger',
  template: `import type { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  context.res = {
    status: 200,
    body: \`Welcome to deno $\{Deno.version.deno} 🦕 in Azure Functions ⚡️!!!\`
  };
}

export default {
  handler,

  // Name of the function
  name: "hello_world",

  // By default, it's an HTTP function. For other functions, add a \`metadata\` property 
  // with the contents of function.json that describes the trigger and bindings.
  // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-example
};
`}, {
  label: 'Queue Trigger',
  template: `import type { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  context.log(\`Queue item received: $\{context.bindings.myQueueItem}\`);
}

export default {
  handler,

  // Name of the function
  name: "queue_trigger",

  metadata: {
    "bindings": [
      {
        // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue-trigger?tabs=csharp#configuration
        "type": "queueTrigger",
        "direction": "in",
        "name": "myQueueItem",
        "queueName": "myqueue-items",
        "connection": "AzureWebJobsStorage"
      }
    ]
  }
};
`}, {
  label: 'ServiceBus Queue Trigger',
  template: `import { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  const mySbMsg = context.bindings.mySbMsg;
  context.log(\`ServiceBus queue trigger function processed message $\{mySbMsg}\`);
};

export default {
  handler,

  // Name of the function
  name: "servicebus_queue_trigger",

  metadata: {
    "bindings": [
      {
        // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus-trigger?tabs=csharp#configuration
        "name": "mySbMsg",
        "type": "serviceBusTrigger",
        "direction": "in",
        "queueName": "myinputqueue",
        "connection": "ServiceBusConnection"
      },
    ],
  },
};
`}, {
  label: 'ServiceBus Topic Trigger',
  template: `import { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  const mySbMsg = context.bindings.mySbMsg;
  context.log(\`ServiceBus topic trigger function processed message $\{mySbMsg}\`);
}

export default {
  handler,

  // Name of the function
  name: "servicebus_topic_trigger",

  metadata: {
    "bindings": [
      {
        // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus-trigger?tabs=csharp#configuration
        "name": "mySbMsg",
        "type": "serviceBusTrigger",
        "direction": "in",
        "topicName": "mytopic",
        "subscriptionName": "mysubscription",
        "connection": "ServiceBusConnection",
      },
    ],
  },
};
`}, {
  label: 'Timer Trigger',
  template: `import { AzureFunctionsContext } from "../deps.ts";

async function handler(context: AzureFunctionsContext) {
  const myTimer = context.bindings.myTimer;
  const timeStamp: string = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("Timer function is running late!");
  }
  context.log(\`Timer trigger function ran! $\{timeStamp}\`);
}

export default {
  handler,

  // Name of the function
  name: "timer_trigger",

  metadata: {
    "bindings": [
      {
        // https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer?tabs=csharp#configuration
        "name": "myTimer",
        "type": "timerTrigger",
        "direction": "in",
        "schedule": "0 * * * * *",
      },
    ],
  },
};
`}];
