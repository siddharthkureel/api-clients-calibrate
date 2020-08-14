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
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    // partnerId: event.requestContext.identity.cognitoIdentityId,
    //         clientId: uuid.v1(),
    //         name: data.name,
    //         age: data.age,
    //         gender: data.gender,
    //         height: data.height,
    //         weight: data.weight,
    //         goal: data.goal,
    //         email: data.email,
    //         phone: data.phone,
    //         payment: data.payment,
    //         createdAt: Date.now(),
    //         updatedAt: Date.now()
    UpdateExpression: "SET #name = :name, age = :age, gender = :gender, height = :height, weight = :weight, goal = :goal, email = :email, phone = :phone, payment = :payment, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":name": data.name || null,
      ":age": data.age || null,
      ":gender": data.gender || null,
      ":height": data.height || null,
      ":weight": data.weight || null,
      ":goal": data.goal || null,
      ":email": data.email || null,
      ":phone": data.phone || null,
      ":payment": data.payment || null,
      ":updatedAt": Date.now()
    },
    ExpressionAttributeNames: {
      "#name": "name"
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.update(params);

  return { status: true };
});