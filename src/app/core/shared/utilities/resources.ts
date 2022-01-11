export class CoreResources {

    // MENU resources
    public static readonly MenuAdded = "Menu added successfully";
    public static readonly MenuAlreadyExists = "Menu already exists in list";
    public static readonly ParentNodeNotFound = "Parent menu not found in list";
    public static readonly NodeUpdateSuccess = "Menu updated successfully";
    public static readonly MenuUpdateFail_AlreadyExists = "Menu update failed. New name already exists";
    public static readonly MenuNotFound = "Menu not foud in list";
    public static readonly MenuDeleteSuccess = "Menu deleted successfully";
    public static readonly MenuChangeSaveError = 'Save changes before selecting different Menu';
    public static readonly MenuChangesSaveSuccess = 'Menu changes saved successfully'
    public static readonly ControlsChangesSaveSuccess = 'Controls changes saved successfully'

    public static readonly MenuApiUrl = {
        getAllMenu: '/menu',
        addMenu: '/menu',
        updateMenu: '/menu/',
        deleteMenu: '/menu/'
    };

    // SNACK BAR resources
    public static readonly SnackBarErrorClass = "snack-bar-error";
    public static readonly SnackBarSuccessClass = "snack-bar-success";

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