import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'partnerId': Identity Pool identity id of the authenticated partner
    // - 'clientId': path parameter
    Key: {
      partnerId: event.requestContext.identity.cognitoIdentityId,
      clientId: event.pathParameters.id
    },
    UpdateExpression: "SET #name = :name",
    ExpressionAttributeValues: {
      ":name": data.value || null,
    },
    ExpressionAttributeNames: {
      "#name": data.name
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true, event };
});