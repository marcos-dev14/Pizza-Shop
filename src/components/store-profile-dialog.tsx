import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { 
  DialogClose,
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GetManagedRestaurantResponse, getManagedRestaurant } from "@/api/get-managed-restaurant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const storeProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string().nullable(),
})

type StorageProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryClient = useQueryClient()

  const { data: managerRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StorageProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managerRestaurant?.name ?? '',
      description: managerRestaurant?.description ?? ''
    }
  })

  function updateManagedRestaurantCache({ name, description }: StorageProfileSchema) {
    const cashed = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

    if (cashed) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
        ...cashed,
        name,
        description
      })
    }
    
    return { cashed }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cashed } = updateManagedRestaurantCache({ name, description })

      return { previousProfile: cashed }
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    }
  })

  async function handleUpdateProfile(data: StorageProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>

            <Input className="col-span-3" id="name" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>

            <Textarea className="col-span-3" id="description" {...register('description')} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>Atualizar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}