Um use case chamar o outro:

1 - Existe uma chamada de dominio que abstraia as regras de negocio independentes ? se sim, ela pode
ser reusada em todas os use case que fizer sentido
(dominio anêmico)

2 - Por reuso, similaridade, incorporação (importação, um tipo de filtro), analisar se em termos de 
performance está tudo bem, se sim, pode chamar, se for pesado, utilizar command handler

3 - Integração, transação de longa duração (pagamento, integração, envio de email), por questões de 
resiliência, é melhor publicar e consumir eventos