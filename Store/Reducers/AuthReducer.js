import { SIGNUP_USER, SET_SIGNUP_USER} from '../Actions/AuthAction'
import SignUpClass from '../../Models/SignUpUser'

const initialState = {
    SignUpUser: [],
    // AllLeave: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SIGNUP_USER:
            return {
                ...state,
                SignUpUser: action.SignUpUser,
                // AllLeave: action.AllLeave
            }

        case SIGNUP_USER:
            const totalUser = new  SignUpClass(
                action.id,
                action.ownerId,
                action.Email,
                action.Password,
                action.Name,
                action.Surname
            )
            return {
                ...state,
                SignUpUser: state.SignUpUser.concat(totalUser),
                // AllLeave: state.AllLeave.concat(totalLeave),
            }
           
    }


    return state;
}