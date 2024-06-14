import { Building, ChevronDown, LogOut } from 'lucide-react'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { getProfile } from '@/api/get-profile'
import { getManagerRestaurant } from '@/api/get-manager-restaurant'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {

  // Usando o useQuery do react-query para fazer as requisições para api usando a funções criadas na pasta src/api.
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    // Temos que passar uma key para o react-query saber se na aplicação tem essa requisição 
    // feita e se tiver ele vai pegar do cache, com isso melhora no desempenho do site
    queryKey: ['profile'],
    queryFn: getProfile
  })

  const { data: managerRestaurant, isLoading: isLoadingManagerRestaurant } = useQuery({
    queryKey: ['managerRestaurant'],
    queryFn: getManagerRestaurant
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex select-none items-center gap-2"
        >
          {isLoadingManagerRestaurant ? 
            ( 
              <Skeleton className="w-40 h-4 " /> 
            ) : ( 
              managerRestaurant?.name 
            )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          {isLoadingProfile ? (
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          ) : (
            <>
              <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Building className="mr-2 h-4 w-4" />
          <span>Perfil da loja</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
