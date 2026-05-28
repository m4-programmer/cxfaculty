import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

type ConfirmDeleteOptions = {
    title?: string;
    text?: string;
    itemName?: string;
    confirmText?: string;
};

export async function confirmDelete({
    title = 'Delete this item?',
    text,
    itemName,
    confirmText = 'Yes, delete it',
}: ConfirmDeleteOptions = {}): Promise<boolean> {
    const message =
        text ??
        (itemName
            ? `"${itemName}" will be permanently removed. This cannot be undone.`
            : 'This action cannot be undone.');

    const result = await Swal.fire({
        title,
        html: `<p class="swal-custom-text">${message}</p>`,
        icon: 'warning',
        iconColor: '#f59e0b',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: 'Keep it',
        reverseButtons: true,
        focusCancel: true,
        buttonsStyling: false,
        customClass: {
            popup: 'swal-custom-popup',
            title: 'swal-custom-title',
            htmlContainer: 'swal-custom-html',
            actions: 'swal-custom-actions',
            confirmButton: 'swal-custom-confirm',
            cancelButton: 'swal-custom-cancel',
            icon: 'swal-custom-icon',
        },
    });

    return result.isConfirmed;
}

export async function confirmDeletePost(title: string): Promise<boolean> {
    return confirmDelete({
        title: 'Delete this post?',
        itemName: title,
        confirmText: 'Delete post',
    });
}

export async function confirmDeleteInquiry(subject: string): Promise<boolean> {
    return confirmDelete({
        title: 'Delete this inquiry?',
        itemName: subject,
        confirmText: 'Delete inquiry',
    });
}
