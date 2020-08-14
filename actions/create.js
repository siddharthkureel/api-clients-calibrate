import { CognitoIdentityServiceProvider } from 'aws-sdk';

import handler from '../libs/handler-lib';

export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const cognitoidentityserviceprovider = new CognitoIdentityServiceProvider();
    var params = {
        UserPoolId: 'ap-southeast-2_bSJu2Hm0J',
        Username: data.email,
        DesiredDeliveryMediums: [
           "EMAIL",
        ],
        TemporaryPassword: data.password,
        UserAttributes: [
            {
                Name: 'email',
                Value: data.email
            },
            {
                Name: 'name',
                Value: data.name
            }
        ]
    };
    return new Promise((res, rej) => {
        cognitoidentityserviceprovider.adminCreateUser(params, async function (err1, data1) {
            if (err1) {
                rej(err1);
            }
            else {
                const result = await addToGroup(data1, cognitoidentityserviceprovider);
                res(result);
            }
        });
    });
});

function addToGroup(data1, cognitoidentityserviceprovider){
    var params = {
        UserPoolId: 'ap-southeast-2_bSJu2Hm0J',
        GroupName: 'Clients',
        Username: data1.User.Username /* required */
        };
    return new Promise((res, rej) => {
        cognitoidentityserviceprovider.adminAddUserToGroup(params, function (err2, data2) {
            if (err2) {
                rej(err2);
            }
            else {
                res(data2);
            }
        });
    });
}
//aws cognito-idp admin-delete-user --user-pool-id ap-southeast-2_bSJu2Hm0J --username ddca7ad5-3ce4-4ddf-baab-a6b5c17c96fd
//serverless invoke local --function create --path mocks/create-event.json