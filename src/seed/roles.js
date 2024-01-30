module.exports = async (roleClass) => {
    const roles = [
        { idRole: 4, nom: 'ADMINISTRATEUR' },
        { idRole: 3, nom: 'REFERENT' },
        { idRole: 2, nom: 'BENEVOLE' },
        { idRole: 1, nom: 'INVITE' }
    ];

    for (const role of roles) {
        await roleClass.findOrCreate({ where: { idRole: role.idRole }, defaults: role });
    }
}