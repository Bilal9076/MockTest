export const SIGNUP_USER = 'SIGNUP_USER'
export const SET_SIGNUP_USER= 'SET_SIGNUP_USER'
import SignUpClass from '../../Models/SignUpUser'


export const fetchSignUpUser = () => {
    return async (dispatch,getState) => {
        const userId = getState().RegisterationAuth.userId;
        try {
            const response = await fetch('https://testproject-c96da-default-rtdb.firebaseio.com//SignUpUser.json');
            if (!response.ok) {
                throw new Error('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedSignUpUser = []
            for (key in resData) {
                LoadedSignUpUser.push(new SignUpClass(
                    key,
                    resData[key].ownerId,
                    resData[key].Email,
                    resData[key].Password,
                    resData[key].Name,
                    resData[key].Surname,

                ))
            }

            dispatch({
                type: SET_SIGNUP_USER,
                SignUpUser: LoadedSignUpUser.filter(prof => prof.ownerId === userId),
            })

        } catch (err) {
            throw err
        }
    };
};

export const CreateSignUpUser = (Email,Password,Name,Surname) => {
    const date = new Date();
    return async (dispatch,getState) => {
        const userId = getState().RegisterationAuth.userId;
        try {
            const response = await fetch('https://testproject-c96da-default-rtdb.firebaseio.com//SignUpUser.json',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Email,
                        Password,
                        Name,
                        Surname,
                        ownerId:userId
                    })
                }
            );
            const resData = await response.json();
            dispatch({
                type:SIGNUP_USER,
                id:resData.name,
                Email,
                Password,
                Name,
                Surname,
                ownerId:userId
             
            });

        } catch (err) {
            console.log(err)
        }
    };
};
