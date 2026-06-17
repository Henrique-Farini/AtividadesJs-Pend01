vendas = []
i = 0

for i in range(5):
    
    venda = float(input("Digite o valor da venda ({}): ".format(i+1)))
    vendas.append(venda)
    


total_caixa = sum(vendas)

print("\n")
print("--- FECHAMENTO DO DIA ---")
print("Total faturado no caixa: R$ {:.2f}".format(total_caixa))

if total_caixa > 150:
    print("Meta atingida! Parabéns, vocês ganharam 10% de desconto no próximo estoque!")
else:
    print("Meta não atingida hoje. Continue se esforçando!")