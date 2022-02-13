export class OriganizationResources {

    // GENERIC resources
    public static readonly CrudActions = {
        Add: 'A',
        Update: 'U',
        Delete: 'D'
    };
    
    public static readonly DeleteConfirmationData = {
        message: 'Are you sure want to delete?',
        buttonText: {
            ok: 'Delete',
            cancel: 'Cancel'
        }
    };


    // Teams Resources
    public static readonly TeamAlreadyExists = 'Team already exists with mentioned name';
    public static readonly TeamIdNotFound = 'Team Id not found';
    public static readonly TeamAddedSuccessfully = 'Team added successfully';

    public static readonly TeamsApiUrl = {
        getAllTeams: '/teams',
        addTeam: '/teams',
        updateTeam: '/teams',
        deleteTeam: '/teams'
    };


    // Roles Resources
    public static readonly RoleAlreadyExists = 'Team already exists with mentioned name';
    public static readonly RoleIdNotFound = 'Team Id not found';
    public static readonly RoleAddedSuccessfully = 'Team added successfully';

    public static readonly RoleApiUrl = {
        getAllRoles: '/roles',
        addRole: '/roles',
        updateRole: '/roles',
        deleteTRole: '/roles'
    };


    // Users Resources
    public static readonly UserApiUrl = {
        getAllUsers: '/users',
        addUser: '/users',
        updateUser: '/users',
        deleteUser: '/users'
    };
}