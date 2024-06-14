import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagerRestaurant } from "@/api/get-manager-restaurant";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

const storeProfileSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
})

type StorageProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const { data: managerRestaurant } = useQuery({
    queryKey: ['managerRestaurant'],
    queryFn: getManagerRestaurant
  })

  const {
    register,
    handleSubmit
  } = useForm<StorageProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managerRestaurant?.name ??'',
      description: managerRestaurant?.description ?? ''
    }
  })

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form>
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
          <Button type="button" variant="ghost">
            Cancelar
          </Button>
          <Button type="submit" variant="success">Atualizar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}