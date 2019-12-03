# **Desafio: Conheça seus deputados!**

### Informações para Contato
Nome: João Paulo Nunes Soares
Email: paulonsoares@yahoo.com.br

## Instruções para executar o projeto

Para executar o projeto durante a fase de desenvolvimento foi utilizado um server http localmente.  A seguir será explicado como executar o server por meio da instalação utilizando-se o node.

### Instalando localmente
Instação por meio do *npm* :

    npm install http-server -g

Obs: Este comando instalará o http-server globalmente na máquina.

### Executando o projeto

Acesse a pasta do projeto, e no diretório raiz execute:

    http-server . -p 1337
    
Isto fará com que o projeto seja executado localmente na porta 1337.

### Acessando o projeto
Após executar o comando anterior o projeto, uma mensagem informando que o server está disponível será apresentada e o projeto poderá ser acessado em um dos seguintes links :

 -  http://127.0.0.1:1337
 - http://192.168.1.47:1337

## Wireframe

Ao pensar na estrutura do projeto, inicialmente levei em conta dois pontos principais: os requisitos relacionados ao público alvo e ambiente da aplicação.
O público alvo da aplicação é bem abrangente o que faz com que as informações precisem ser apresentadas de forma mais simples possível, além do mais o caminho até essas informações deve utilizar de diversos padrões que possam ser facilmente reconhecidos e compreendidas até pelos considerados usuários leigos. 
Como o desafio propõe que adotemos a persona de um desenvolvedor do Lab, parti do pressuposto que a página teria como base um sistema governamental e logo deveria respeitar alguns padrões que regem os sistemas dessa área. Dessa forma utilizei como base para a construção da página o template do site da Câmara dos Deputados e segui ao máximo a identidade visual apresentada em outras páginas do site, assim como buscando seguir a cartilha de [Padrões Web em Governo Eletrônico e-PWG](http://epwg.governoeletronico.gov.br/cartilha-usabilidade#padroes).

### Conceito

Para pensar melhor em uma solução que se enquadre ao desafio e que possuísse o máximo de elementos já reconhecidos pelo público alvo, e que já tenham sido validados ao longo dos anos, fiz uma pesquisa em sites relacionados para visualizar como estes dados eram disponibilizados. Para isso acessei sites de assembleias legislativas estaduais, assim como outros órgãos colegiados do governo que possam apresentar semelhanças com o objetivo final do desafio proposto.
Com essa pesquisa consegui observar dois padrões principais: 

 1. Em parte dos sites uma lista é mostrada contendo o nome eleitoral e a foto, e outras informações adicionais são mostradas somente quando o usuário seleciona a pessoa que deseja visualizar;
 2. Em outra parte dos sistemas somente uma tabela contendo informações como: Nome, partido, estado e alguma forma de contato disponível (como telefone ou email) é mostrada.

Observando estes padrões, e tendo em mente a decisão de manter pelo menos a base de alguns desses padrões optei por seguir o padrão 1 porém realizando algumas modificações visuais. Decidi mostrar mais informações inicialmente para o usuário em meio a lista, selecionando esses campos de acordo com os disponibilizados pela API de busca geral dos deputados.

Para mostrar esses dados e deputados de uma forma mais amigável aos usuários recorri a um recurso que utilizei em sistemas no TCU, o de *cards*! Apesar de parecerem bem simples trazem uma certa de ideia de modernidade e informalidade ao sistema, o que foi amplamente aceito pela comunidade interna e logo se expandindo para outros sistemas.

Antes de começar a implementar essas ideias realizei alguns esboços em folhas de papel, de certa forma alguns pequenos protótipos de baixa fidelidade, para poder organizar melhor essas ideias e continuar a implementar. Sendo assim a página inicial contém uma lista de *cards*, apresentando: informações básicas dos deputados, seu nome eleitoral, sua foto e um botão em cada *card* que possibilita ao usuário visualizar mais informações em um modal.

Para melhor otimização da página neste projeto, optei por mostrar 50 deputados em cada página do sistema de paginação, tendo assim um total de 11 páginas para comportar todos os atuais 513 deputados.

Para mostrar mais informações sobre os deputados optei por utilizar um modal, fazendo assim com que o usuário não precise ficar navegando entre diversas páginas para acessar as informações e possa ter uma experiência de uso mais fluída. Apesar de muitas vezes o modal ser considero como um elemento anti-usabilidade por bloquear o fluxo de uso do usuário, considero que nesta aplicação e neste objetivo específico a experiência do usuário não é prejudicada e o modal é uma boa forma de mostrar as informações.

O modal possui três blocos de informações principais: foto, dados pessoais e informações relacionadas. Outras informações relacionadas ao deputado, além das apresentadas anteriormente, estão disponíveis no bloco de Dados pessoais, onde os campos selecionados para compor essas áreas foram escolhidos de acordo com a utilização presente em outros sistemas relacionados.

No bloco de informações relacionados, escolhi mostrar três conjuntos de dados: últimas despesas, próximos eventos e frentes parlamentares em que o deputado é membro. O conjunto de despesas foi adicionado como o default para visualização ao abrir o perfil por considerar como uma das principais informações que um usuário possa desejar ao acompanhar seu representante, apresentando assim de forma direta ao usuário as últimas despesas registradas e informações básicas da despesa registrada como o tipo, valor e a nota fiscal correspondente que foi anexada. 

Ao final do modal um botão "Visualizar Mais" é apresentado, tendo a ideia desse de redirecionar para outas páginas que possam apresentar informações mais detalhadas e em um maior volume relacionado a essas informações relacionadas. Pois o usuário foi introduzido a uma pequena parte das informações e caso se interesse terá um caminho facilitado para obter o que deseja.

Além disso pensei em adicionar uma seção de filtros ao usuário no página inicial, página que contém a lista geral de usuários, que permita ao usuário refinar sua busca e consiga assim alcançar seu objetivo de forma mais rápida e direta caso tenha seu objetivo já definido previamente. Para esses filtros adicionei somente algumas informações que estão disponíveis na API e que considero relevantes, já que caso muitas opções estejam presentes o usuário pode acabar sendo induzido ao erro e a tela do sistema acabe ficando poluída. Essa seção de filtros não está funcional, tendo somente o campo de pesquisa utilizando um autocomplete para demonstrar a ideia.

### Decisões Técnicas

Para agilizar o desenvolvimento e tornar a experiência visual mais agradável, utilizei de algumas bibliotecas adicionais e do framework Bootstrap para o desenvolvimento. A importação destes é feita de forma online, não tendo uma cópia local no projeto desses arquivos.

Além disso para uma melhor organização do arquivo principal (index.html), outros arquivos foram criados e estes são inseridos durante a renderização em meio ao arquivo principal.

## Funcionamento
