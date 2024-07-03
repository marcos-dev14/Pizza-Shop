import { DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'

export function MonthCanceledOrderAmountCard() {
  const { data: monthCanceledOrderAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount
  })

  return (
    <Card>
      <CardHeader className="item-center flex-row justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamento (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthCanceledOrderAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthCanceledOrderAmount.amount.toLocaleString('pt-BR')}
            </span>

            <p className="text-xs text-muted-foreground">
              {monthCanceledOrderAmount.diffFromLastMonth === 0 && (
                <>
                  <span className="text-gray-500 dark:text-gray-400">
                    {monthCanceledOrderAmount.diffFromLastMonth}%  
                  </span>{' '}
                  em relação ao mês passado
                </>
              )}

              {monthCanceledOrderAmount.diffFromLastMonth < 0 && (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    {monthCanceledOrderAmount.diffFromLastMonth}%  
                  </span>{' '}
                  em relação ao mês passado
                </> 
              )}

              {monthCanceledOrderAmount.diffFromLastMonth > 0 && (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    +{monthCanceledOrderAmount.diffFromLastMonth}%  
                  </span>{' '}
                  em relação ao mês passado
                </> 
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
