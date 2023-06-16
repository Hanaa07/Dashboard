export type UserType = {
    id?: number,
    adresse: string,
    adresse_mail: string,
    nom: string,
    prenom: string,
    num_tel: string | number,
    statut: string | null,
    start_date: string,
    birth: string,
    balance: number | undefined,
    exp_pro: string,
    exp_mit: string,
}