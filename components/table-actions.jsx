'use client'

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import DialogAlert from "./dialog-alert";
import { useT } from "@/contexts/TranslationContext";

export default function TableActions ({id, 
    editRoute, 
    handleDelete, 
    viewEnable = true, 
    editEnabled = true, 
    deleteEnabled = true,
    searchTerm,
    title, 
    description, 
    deleteButtonText = 'Eliminar',
    extraActions = [],
    fechaInicio,
    fechaFin
    }){

    const { t } = useT()

    const router = useRouter()

    const handleEdit = () => {

        if(editRoute.includes('trips/trip/')){
            router.push(`/home/actions/action/${id}?from=${editRoute.split("/")[1]}/${editRoute.split("/")[2]}&viaje=${editRoute.split("/")[3]}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
        } else if (searchTerm?.advanced) {
            const params = new URLSearchParams();
            params.append('advanced', 'true');
            if (searchTerm.titulo) params.append('titulo', searchTerm.titulo);
            if (searchTerm.compania) params.append('compania', searchTerm.compania);
            if (searchTerm.tipo) params.append('tipo', searchTerm.tipo);
            if (searchTerm.responsable) params.append('responsable', searchTerm.responsable);
            if (searchTerm.fechaInicio) params.append('fechaInicio', searchTerm.fechaInicio);
            if (searchTerm.orderByDate) params.append('orderByDate', searchTerm.orderByDate);
            
            router.push(`${editRoute}/${id}?${params.toString()}`)
        } else {
            router.push(`${editRoute}/${id}`)
        }

    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem 
                onClick={() => handleEdit(id)} 
                className={`${viewEnable ? '' : 'hidden'}`}
            >
                <Eye className="mr-2 h-4 w-4" />
                {t('table_actions_view')}
            </DropdownMenuItem>
            <DropdownMenuItem 
                onClick={() => handleEdit(id)} 
                className={`${editEnabled ? '' : 'hidden'}`}
            >
                <Pencil className="mr-2 h-4 w-4" />
                {t('table_actions_edit')}
            </DropdownMenuItem>
            
            <div className={`${deleteEnabled ? '' : 'hidden'}`}>
                <DialogAlert 
                    title={title}
                    description={description}
                    buttonText={deleteButtonText}
                    onConfirm={() => handleDelete(id)}
                    extraActions={extraActions}
                    >
                    <button className="w-full text-red-600 focus:text-red-600 flex items-center px-2 py-1 gap-2 text-sm rounded hover:bg-red-100">
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t('table_actions_delete')}
                    </button>
                </DialogAlert>
            </div>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}