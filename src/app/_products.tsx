"use client";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import SalesService from "@/infrastructure/services/sales";
import { formatMoney } from "@/utils/format-money";
import { Suspense, useEffect, useState } from "react";
import { ISalesPaginated } from "@/interfaces/sales-interface";
import { Separator } from "@/components/ui/separator";
import { MultipleSelect, SelectedKey } from "@/components/ui/multiple-select";
import { useListData } from "react-stately";
import { IFilters } from "@/interfaces/filters-interface";
import { Select } from "@/components/ui/select";
import type { Key } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
type DateToFilter = {
  start: string;
  end: string;
};
const Sales = () => {
  const [sales, setSales] = useState<ISalesPaginated[]>([]);
  const [filters, setFilters] = useState<IFilters>();
  const [date, setDate] = useState<DateToFilter>();
  const [vendedorId, setVendedorId] = useState<string | undefined>(undefined);
  const [clienteId, setClienteId] = useState<string | undefined>(undefined);

  const service = new SalesService();

  const fetchData = async () => {
    const res = await service.get();
    const res_filters = await service.filters();
    setFilters(res_filters.body);
    setSales(res.body);
    return;
  };
  useEffect(() => {
    fetchData();
  }, []);
  const filter = async () => {
    const filters = {
      data_inicio: date?.start,
      data_fim: date?.end,
      vendedor_id: vendedorId,
      cliente_id: clienteId,
    };
    const res = await service.get(filters);
    setSales(res.body);
  };
  const export_data = async () => {
    const filters = {
      data_inicio: date?.start,
      data_fim: date?.end,
      vendedor_id: vendedorId,
      cliente_id: clienteId,
    };
    const res = await service.export(filters);
    const blob = new Blob([res.body], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio_vendas.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  useEffect(() => {
    filter();
  }, [clienteId, date?.start, date?.end, vendedorId]);
  return (
    <Card>
      <Suspense>
        <section className="p-2 flex justify-between space-x-2 items-center">
          {filters?.vendedores && (
            <Select
              label="Vendedores"
              placeholder="Selecione um vendedor"
              selectedKey={vendedorId}
              //@ts-ignore
              onSelectionChange={setVendedorId}
            >
              <Select.Trigger />
              <Select.List items={filters?.vendedores}>
                {(item) => (
                  <Select.Option id={item.id} textValue={item.name}>
                    {item.name}
                  </Select.Option>
                )}
              </Select.List>
            </Select>
          )}
          {filters?.clientes && (
            <Select
              label="Clientes"
              placeholder="Selecione um cliente"
              selectedKey={clienteId}
              //@ts-ignore
              onSelectionChange={setClienteId}
            >
              <Select.Trigger />
              <Select.List items={filters?.clientes}>
                {(item) => (
                  <Select.Option id={item.id} textValue={item.name}>
                    {item.name}
                  </Select.Option>
                )}
              </Select.List>
            </Select>
          )}
          <DateRangePicker
            label="Data Inicio - Data Fim"
            value={date}
            onChange={setDate}
          />
          <Button className={"mt-6"} onPress={() => export_data()}>
            Exportar
          </Button>
        </section>
        <Separator
          orientation="horizontal"
          className="w-fu
    "
        />
        <Table>
          <Table.Header>
            <Table.Column>#</Table.Column>
            <Table.Column isRowHeader>Vendedor</Table.Column>
            <Table.Column>Cliente</Table.Column>
            <Table.Column>Data da venda</Table.Column>
            <Table.Column>Total Valor</Table.Column>
            <Table.Column>Total Items</Table.Column>
          </Table.Header>
          <Table.Body items={sales}>
            {(item) => (
              <Table.Row id={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.vendedor}</Table.Cell>
                <Table.Cell>{item.cliente}</Table.Cell>
                <Table.Cell>{format(item.data_venda, "dd/MM/yyyy")}</Table.Cell>
                <Table.Cell>{formatMoney(item.total_valor)}</Table.Cell>
                <Table.Cell>{item.total_itens}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Suspense>
    </Card>
  );
};

export default Sales;
