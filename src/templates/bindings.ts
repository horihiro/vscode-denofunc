'use strict';

export const bindingTemplates: any[] = [{
  label: 'Azure Blob Storage',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-output?tabs=javascript#configuration',
  type: 'blob',
  direction: 'out',
  name: 'outputBlob',
  path: 'outcontainer/{rand-guid}',
  connection: 'AzureWebJobsStorage'
}, {
  label: 'Azure Cosmos DB',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-output?tabs=javascript#configuration',
  type: 'cosmosDB',
  direction: 'out',
  name: 'outputDocument',
  databaseName: 'outDatabase',
  collectionName: 'MyCollection',
  createIfNotExists: 'true',
  connectionStringSetting: 'CosmosDBConnection'
}, {
  label: 'Azure Event Grid',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-grid-output?tabs=javascript#configuration',
  type: 'eventGrid',
  name: 'outputEvent',
  topicEndpointUri: 'MyEventGridTopicUriSetting',
  topicKeySetting: 'MyEventGridTopicKeySetting',
  direction: 'out'
}, {
  label: 'Azure Event Hubs',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-event-hubs-output?tabs=javascript#configuration',
  type: 'eventHub',
  direction: 'out',
  name: 'outputEventHubMessage',
  connection: 'AzureWebJobsStorage',
  eventHubName: 'outeventhub'
}, {
  label: 'Azure Queue Storage',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-queue-output?tabs=javascript#configuration',
  type: 'queue',
  direction: 'out',
  name: 'outputQueueItem',
  queueName: 'outqueue',
  connection: 'AzureWebJobsStorage'
}, {
  label: 'Azure Service Bus',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-service-bus-output?tabs=javascript#configuration',
  type: 'serviceBus',
  direction: 'out',
  connection: 'AzureWebJobsServiceBus',
  name: 'outputSbMsg',
  queueName: 'outqueue',
  topicName: 'outtopic'
}, {
  label: 'Azure Table Storage',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-table-output?tabs=javascript#configuration',
  type: 'table',
  direction: 'out',
  name: 'outputTable',
  tableName: 'outTable',
  connection: 'AzureWebJobsStorage'
}, {
  label: 'HTTP',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-http-webhook-output#configuration',
  type: 'http',
  direction: 'out',
  name: 'res',
}, {
  label: 'SendGrid',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-sendgrid?tabs=javascript#configuration',
  type: 'sendGrid',
  direction: 'out',
  name: 'message',
  apiKey: 'AzureWebJobsSendGridApiKey',
  to: 'RECIPIENTS_ADDRESS',
  from: 'SENDER_ADDRESS',
  subject: 'EMAIL_SUBJECT',
  text: 'EMAIL_CONTENT'
}, {
  label: 'SignalR',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-signalr-service-output?tabs=javascript#configuration',
  type: 'signalR',
  direction: 'out',
  name: 'signalRMessages',
  hubName: 'HUB_NAME',
  connectionStringSetting: 'AzureSignalRConnectionString'
}, {
  label: 'Twillio SMS',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-twilio?tabs=javascript#configuration',
  type: 'twilioSms',
  direction: 'out',
  name: 'message',
  accountSidSetting: 'TwilioAccountSid',
  authTokenSetting: 'TwilioAuthToken'
}, {
  label: 'Azure Blob Storage',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-blob-input?tabs=javascript#configuration',
  type: 'blob',
  direction: 'in',
  name: 'inputBlob',
  path: 'incontainer/{name}',
  connection: 'AzureWebJobsStorage'
}, {
  label: 'Azure Cosmos DB',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-cosmosdb-v2-input?tabs=javascript#configuration',
  type: 'cosmosDB',
  direction: 'in',
  name: 'inputDocument',
  databaseName: 'inDatabase',
  collectionName: 'MyCollection',
  connectionStringSetting: 'CosmosDBConnection',
  Id: '{id}',
  PartitionKey: '{partitionKeyValue}'
}, {
  label: 'Azure Table Storage',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-table-input?tabs=javascript#configuration',
  type: 'table',
  direction: 'in',
  name: 'inputTable',
  tableName: 'inTable',
  partitionKey: 'PARTITION_KEY',
  rowKey: 'ROW_KEY',
  connection: 'AzureWebJobsStorage'
}, {
  label: 'SignalR',
  reference: 'https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-signalr-service-input?tabs=javascript#configuration',
  type: 'signalRConnectionInfo',
  direction: 'in',
  name: 'connectionInfo',
  hubName: 'chat',
  connectionStringSetting: 'AzureWebJobsStorage'
}];
