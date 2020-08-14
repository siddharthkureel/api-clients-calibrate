import * as uuid from 'uuid';
import handler from "../libs/handler-lib";
import dynamoDb from "../libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        // 'Item' contains the attributes of the item to be created
        // - 'partnerId': partner identities are federated through the
        // Cognito Identity Pool, we will use the identity id
        // as the partner id of the authenticated partner
        // - 'clientId': a unique uuid
        // - 'name': parsed from request body
        // - 'age': parsed from request body
        // - 'gender': parsed from request body
        // - 'height': parsed from request body
        // - 'weight': parsed from request body
        // - 'goal': parsed from request body
        // - 'email': parsed from request body
        // - 'phone': parsed from request body
        // - 'payment': current Unix timestamp
        Item: {
            partnerId: event.requestContext.identity.cognitoIdentityId,
            clientId: uuid.v1(),
            name: data.name,
            age: data.age,
            gender: data.gender,
            height: data.height,
            weight: data.weight,
            goal: data.goal,
            email: data.email,
            phone: data.phone,
            accountCreated: false,
            payment: data.payment,
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    };
    await dynamoDb.put(params);
    return params.Item;
});