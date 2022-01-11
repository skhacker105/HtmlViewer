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
}