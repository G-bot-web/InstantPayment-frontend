export const signin = (data) => {
    return {
        type: 'signin',
        data: data
    }
}

export const setalert = (data) => {
    return {
        type: 'setalert',
        alertdata: data
    }
}

export const closealert = () => {
    return {
        type: 'closealert',
    }
}


export const usersuccess = (data) => {
    return {
        type: 'usersuccess',
        userdata: data
    }
}

export const loading = (data) => {
    return {
        type: 'loading',
        loading:data
    }
}

export const updateStatus = (request,response) => {
    return {
        type: 'updateLastTransaction',
        request:request,
        response:response
    }
}

export const getTransactions = (data) => {
    return {
        type: 'getTransactions',
        transactions:data,
    }
}

export const updateIsExploding = () => {
    return {
        type: 'IsExploding',
        IsExploding:true,
    }
}

export const updateIsIsLoading = (data) => {
    return {
        type: 'IsLoading',
        IsLoading:data,
    }
}

export const AuthUser = (data) => {
    return {
        type: 'AuthUser',
        User:data,
    }
}
export const clearAuth = () => {
    return {
        type: 'clearAuth',
    }
}