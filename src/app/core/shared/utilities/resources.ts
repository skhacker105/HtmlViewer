export class CoreResources {

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


    // Login resources
    public static readonly LoginApiUrl = {
        Login: '/users/login',
        Logout: '/users/logout'
    };

    public static readonly HTTPNoStatusError = 'There was no response from server. It may be slow or unavailable.';
    public static readonly RecordNotFound = 'No record found.';
    public static readonly Forbidden = 'Access is denied for this user.';
}