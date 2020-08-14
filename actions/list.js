import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    console.log(event.requestContext.identity.cognitoIdentityId);
    const params = {
        TableName: process.env.tableName,
        //'KeyConditionExpression' defines the condition for the query
        // - 'partnerId = :partnerId': only return items with matching 'partnerId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':partnerId': defines 'partnerId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: "partnerId = :partnerId",
        ExpressionAttributeValues: {
            ":partnerId": event.requestContext.identity.cognitoIdentityId
        }
    };

    const result = await dynamoDb.query(params);
    return result.Items;
});