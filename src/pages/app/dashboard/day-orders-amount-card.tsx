import { Utensils } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getDayOrdersAmount } from '@/api/get-day-orders-amount'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount
  })

  return (
    <Card>
      <CardHeader className="item-center flex-row justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedido (dia)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>

            <p className="text-xs text-muted-foreground">
              {dayOrdersAmount.diffFromYesterday === 0 && (
                <>
                  <span className="text-gray-500 dark:text-gray-400">
                    {dayOrdersAmount.diffFromYesterday}%  
                  </span>{' '}
                  em relação ao dia passado
                </>
              )}

              {dayOrdersAmount.diffFromYesterday > 0 && (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{dayOrdersAmount.diffFromYesterday}%  
                  </span>{' '}
                  em relação ao dia passado
                </> 
              )}

              {dayOrdersAmount.diffFromYesterday < 0 && (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    {dayOrdersAmount.diffFromYesterday}%  
                  </span>{' '}
                  em relação ao dia passado
                </> 
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
