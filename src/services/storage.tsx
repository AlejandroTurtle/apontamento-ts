interface IApontamento{
    login: boolean
}

const apontamento = {
    login: false
}

export const getAllLocalStorage = (): string | null => {
    return localStorage.getItem("apontamento")
}

export const createLocalStorage = ():void => {
    localStorage.setItem("apontamento", JSON.stringify(apontamento))
}

export const changeLocalStorage = (apontamento: IApontamento):void => {
    localStorage.setItem("apontamento", JSON.stringify(apontamento))
}