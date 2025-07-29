
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AddEditMenuItemForm } from './AddEditMenuItemForm';

interface MenuItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId?: string;
  onSave: () => void;
}

export function MenuItemDialog({ open, onOpenChange, itemId, onSave }: MenuItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {itemId ? 'Edit Menu Item' : 'Add New Menu Item'}
          </DialogTitle>
        </DialogHeader>
        <AddEditMenuItemForm
          itemId={itemId}
          onClose={() => onOpenChange(false)}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
}
