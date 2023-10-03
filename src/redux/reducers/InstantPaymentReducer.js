const initialState = {
    lastTransaction: {
        name: '', email: '', phone: '',
        CardAccount: {},
        DDAccount: {},
        CoinTransfer: {},
        TransactionType: "",
    },
    lastTransactionResponse: {},
    transactionList: [],
    IsExploding: false,
    IsLoading: false,
    logdinUser: {},
    loading: false,
    password: '',
    users: [],
    userspecificdata: [],
    error: '',
    setalert: '',
    search: false,
    searchresult: '',
    result: []
    
}
export default function cardItems(state = initialState, action) {

    const newstate = { ...state };
    switch (action.type) {

        case 'updateIsLoading':
            return {
                ...state, IsLoading: action.IsLoading
            }
            case 'loading':
                return {
                    ...state, loading: action.loading
                }
        case 'updateLastTransaction':
            return {
                ...state, lastTransactionResponse: action.response, lastTransaction: action.request
            }

        case 'getTransactions':
            return {
                ...state, transactionList: action.transactions
            }
        case 'IsExploding':
            return {
                ...state, IsExploding: action.IsExploding
            }
        case 'AuthUser':
            return {
                ...state, logdinUser: action.User
            }
        case 'clearAuth':
            return {
                ...state, logdinUser: {}
            }
        case 'signin':

            newstate.username = action.data.username
            newstate.password = action.data.password
            return newstate;


        case 'newform':
            return {
                ...state, value: !(state.value), edit: false
            }

        case 'usersuccess':
            return {
                ...state, users: action.userdata, error: '', value: false
            }

        default:
            return state;
    }


}