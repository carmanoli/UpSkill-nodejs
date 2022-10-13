-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Out-2022 às 18:13
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `agf`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `ator`
--

CREATE TABLE `ator` (
  `idpessoa` int(11) NOT NULL,
  `idfilme` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `ator`
--

INSERT INTO `ator` (`idpessoa`, `idfilme`) VALUES
(52, 1),
(32, 1),
(17, 1),
(50, 2),
(15, 2),
(26, 2),
(42, 3),
(24, 3),
(14, 3),
(15, 4),
(35, 4),
(36, 4),
(45, 5),
(28, 5),
(30, 5),
(48, 6),
(34, 6),
(16, 6),
(44, 7),
(25, 7),
(40, 7),
(46, 8),
(39, 8),
(38, 8),
(44, 9),
(25, 9),
(33, 9),
(43, 10),
(20, 10),
(29, 10),
(51, 11),
(37, 11),
(22, 11),
(41, 12),
(19, 12),
(31, 12),
(47, 13),
(27, 13),
(21, 13),
(44, 14),
(40, 14),
(25, 14),
(49, 15),
(23, 15),
(18, 15),
(15, 33),
(26, 33);

-- --------------------------------------------------------

--
-- Estrutura da tabela `designacaopadonizada`
--

CREATE TABLE `designacaopadonizada` (
  `idDesignacaoPadronizada` int(11) NOT NULL,
  `Designacao` varchar(100) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `designacaopadonizada`
--

INSERT INTO `designacaopadonizada` (`idDesignacaoPadronizada`, `Designacao`) VALUES
(1, 'Favoritos'),
(2, 'Quero Ver'),
(3, 'Não Gosto');

-- --------------------------------------------------------

--
-- Estrutura da tabela `filme`
--

CREATE TABLE `filme` (
  `idfilme` int(11) NOT NULL,
  `titulo` varchar(100) COLLATE latin1_bin NOT NULL,
  `ano` int(11) NOT NULL,
  `sinopse` text COLLATE latin1_bin NOT NULL,
  `siglaidoma` char(5) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `filme`
--

INSERT INTO `filme` (`idfilme`, `titulo`, `ano`, `sinopse`, `siglaidoma`) VALUES
(1, 'Um Sonho de Liberdade', 1994, 'Dois homens presos se reúnem ao longo de vários anos, encontrando consolo e eventual redenção através de atos de decência comum.', 'UK-US'),
(2, 'O Poderoso Chefão', 1972, 'O patriarca idoso de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.', 'UK-US'),
(3, 'Batman: O Cavaleiro das Trevas', 2008, 'Quando a ameaça conhecida como O Coringa surge de seu passado, causa estragos e caos nas pessoas de Gotham. O Cavaleiro das Trevas deve aceitar um dos maiores testes para combater a injustiça.', 'UK-US'),
(4, 'O Poderoso Chefão II', 1974, 'Em 1950, Michael Corleone, agora à frente da família, tenta expandir o negócio do crime a Las Vegas, Los Angeles e Cuba. Paralelamente, é revelada a história de Vito Corleone, e de como saiu da Sicília e chegou a Nova Iorque.\r\n', 'UK-US'),
(5, '12 Homens e uma Sentença', 1957, 'Um jurado que se aposenta tenta evitar um erro judicial forçando seus colegas a reconsiderarem as evidências.\r\n', 'UK-US'),
(6, 'A Lista de Schindler', 1993, 'Depois de testemunhar a perseguição dos judaicos na Polônia ocupada pelos alemães durante a Segunda Guerra Mundial, o industrial Oskar Schindler se começa a preocupar com sua força de trabalho judaica.\r\n', 'UK-US'),
(7, 'O Senhor dos Anéis: O Retorno do Rei', 2003, 'Gandalf e Aragorn lideram o Mundo dos Homens contra o exército de Sauron para desviar o olhar de Frodo e Sam quando eles se aproximam á Montanha da Perdição com o Um Anel.\r\n', 'UK-US'),
(8, 'Pulp Fiction: Tempo de Violência', 1994, 'As vidas de dois assassinos da máfia, um boxeador, um gângster e sua esposa, e um par de bandidos se entrelaçam em quatro histórias de violência e redenção.', 'UK-US'),
(9, 'O Senhor dos Anéis: A Sociedade do Anel', 2001, 'Um manso hobbit do Condado e oito companheiros partem em uma jornada para destruir o poderoso Um Anel e salvar a Terra-média das Trevas.', 'UK-US'),
(10, 'Três Homens em Conflito', 1966, 'Um impostor se junta com dois homens para encontrar fortuna num remoto cemitério.\r\n', 'UK-US'),
(11, 'Forrest Gump: O Contador de Histórias', 1994, 'As presidências de Kennedy e Johnson, os eventos do Vietnã, Watergate e outra história são desenvolvidos através da perspectiva de um homem do Alabama com um alto quociente Intelectual.\r\n', 'UK-US'),
(12, 'Clube da Luta', 1999, 'Um trabalhador de escritório e um fabricante de sabonetes que cuidam do diabo formam um clube de luta clandestino que evolui para algo muito maior.\r\n', 'UK-US'),
(13, 'A Origem', 2010, 'Um ladrão que rouba segredos corporativos através do uso de tecnologia é dado a tarefa inversa de plantar uma idéia na mente de um C.E.O.', 'UK-US'),
(14, 'O Senhor dos Anéis: As Duas Torres', 2002, 'Enquanto Frodo e Sam estão perto de Mordor com a ajuda de Gollum, a divida comunhão luta contra Saruman e os Isengards.\r\n', 'UK-US'),
(15, 'O Império Contra-Ataca', 1980, 'Os rebeldes derrotaram o Império no planeta congelado Hoth. Luke Skywalker começa a treinar como um Jedi com Yoda, enquanto seus amigos são perseguidos por Darth Vader.\r\n', 'UK-US'),
(33, 'Vesper', 2023, 'teste', 'UK-US');

-- --------------------------------------------------------

--
-- Estrutura da tabela `filmegenero`
--

CREATE TABLE `filmegenero` (
  `idfilme` int(11) NOT NULL,
  `idgenero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `filmegenero`
--

INSERT INTO `filmegenero` (`idfilme`, `idgenero`) VALUES
(1, 1),
(1, 1),
(2, 2),
(2, 1),
(3, 3),
(3, 2),
(3, 1),
(4, 2),
(4, 1),
(5, 2),
(5, 1),
(6, 5),
(6, 4),
(6, 1),
(7, 3),
(7, 6),
(7, 1),
(8, 2),
(8, 1),
(9, 3),
(9, 6),
(9, 1),
(10, 6),
(10, 7),
(11, 1),
(11, 8),
(12, 1),
(13, 3),
(13, 6),
(13, 9),
(14, 3),
(14, 6),
(14, 9),
(15, 3),
(15, 6),
(15, 10),
(33, 9),
(33, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `genero`
--

CREATE TABLE `genero` (
  `idgenero` int(11) NOT NULL,
  `nome` varchar(100) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `genero`
--

INSERT INTO `genero` (`idgenero`, `nome`) VALUES
(1, 'Drama'),
(2, 'Policial'),
(3, 'Ação'),
(4, 'Biografia'),
(5, 'História'),
(6, 'Aventura'),
(7, 'Faroeste'),
(8, 'Romance'),
(9, 'Ficção científica'),
(10, 'Fantasia'),
(11, 'Terror'),
(12, 'Musical');

-- --------------------------------------------------------

--
-- Estrutura da tabela `idioma`
--

CREATE TABLE `idioma` (
  `siglaidioma` char(5) COLLATE latin1_bin NOT NULL,
  `idioma` varchar(100) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `idioma`
--

INSERT INTO `idioma` (`siglaidioma`, `idioma`) VALUES
('IT-IT', 'Italiano'),
('KR-KR', 'Coreano da Coreia do Sul'),
('PT-BR', 'Português do Brasil'),
('UK-US', 'Inglês Americano');

-- --------------------------------------------------------

--
-- Estrutura da tabela `listadesignacaopadronizada`
--

CREATE TABLE `listadesignacaopadronizada` (
  `idListaFilme` int(11) NOT NULL,
  `idDesignacaoPadronizada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `listadesignacaopadronizada`
--

INSERT INTO `listadesignacaopadronizada` (`idListaFilme`, `idDesignacaoPadronizada`) VALUES
(1, 1),
(5, 1),
(11, 1),
(13, 1),
(4, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `listadesignacaopersonalizada`
--

CREATE TABLE `listadesignacaopersonalizada` (
  `idListaFilme` int(11) NOT NULL,
  `designacao` varchar(100) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `listadesignacaopersonalizada`
--

INSERT INTO `listadesignacaopersonalizada` (`idListaFilme`, `designacao`) VALUES
(2, 'Best of Best'),
(6, 'Lista Old But Gold'),
(12, 'Lista Maratona do FDS'),
(14, 'Lista Vale a Pena Rever'),
(24, 'test559'),
(25, 'test55');

-- --------------------------------------------------------

--
-- Estrutura da tabela `listafilme`
--

CREATE TABLE `listafilme` (
  `idlistafilme` int(11) NOT NULL,
  `idutilizador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `listafilme`
--

INSERT INTO `listafilme` (`idlistafilme`, `idutilizador`) VALUES
(1, 1),
(2, 1),
(15, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(3, 2),
(4, 2),
(11, 3),
(12, 3),
(5, 4),
(6, 4),
(13, 5),
(14, 5);

-- --------------------------------------------------------

--
-- Estrutura da tabela `listafilmeconteudo`
--

CREATE TABLE `listafilmeconteudo` (
  `idListaFilme` int(11) NOT NULL,
  `idFilme` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `listafilmeconteudo`
--

INSERT INTO `listafilmeconteudo` (`idListaFilme`, `idFilme`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(3, 11),
(3, 12),
(3, 13),
(3, 14),
(3, 15),
(4, 1),
(4, 2),
(5, 2),
(5, 4),
(5, 5),
(5, 6),
(5, 8),
(5, 10),
(5, 11),
(5, 12),
(6, 2),
(6, 4),
(6, 5),
(6, 10),
(11, 3),
(11, 7),
(11, 9),
(11, 11),
(11, 12),
(11, 14),
(11, 15),
(12, 7),
(12, 9),
(12, 14),
(13, 1),
(13, 2),
(13, 4),
(13, 5),
(13, 6),
(13, 10),
(13, 11),
(14, 6),
(14, 11);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoa`
--

CREATE TABLE `pessoa` (
  `idpessoa` int(11) NOT NULL,
  `nome` varchar(100) COLLATE latin1_bin NOT NULL,
  `datanascimento` date NOT NULL,
  `genero` char(1) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `pessoa`
--

INSERT INTO `pessoa` (`idpessoa`, `nome`, `datanascimento`, `genero`) VALUES
(1, 'Frank Darabont', '1959-01-28', 'M'),
(2, 'Francis Ford Coppola', '1939-04-07', 'M'),
(3, 'Christopher Nolan', '1970-07-30', 'M'),
(5, 'Sidney Lumet', '1924-06-25', 'M'),
(6, 'Steven Spielberg', '1946-12-18', 'M'),
(7, 'Peter Jackson', '1961-10-31', 'M'),
(8, 'Quentin Tarantino', '1963-03-27', 'M'),
(10, 'Sergio Leone', '1989-04-30', 'M'),
(11, 'Robert Zemeckis', '1951-05-14', 'M'),
(12, 'David Fincher', '1962-08-28', 'M'),
(13, 'Irvin Kershner', '1923-04-23', 'M'),
(14, 'Aaron Eckhart', '1968-03-12', 'M'),
(15, 'Al Pacino', '1940-04-25', 'M'),
(16, 'Ben Kingsley', '1943-12-31', 'M'),
(17, 'Bob Gunton', '1945-11-15', 'M'),
(18, 'Carrie Fisher', '1956-10-21', 'F'),
(19, 'Edward Norton', '1969-08-18', 'M'),
(20, 'Eli Wallach', '1915-12-07', 'M'),
(21, 'Elliot Page', '1987-02-21', 'F'),
(22, 'Gary Sinise', '1955-03-17', 'M'),
(23, 'Harrison Ford', '1942-07-13', 'M'),
(24, 'Heath Ledger\r\n', '1979-04-04', 'M'),
(25, 'Ian McKellen', '1939-05-25', 'M'),
(26, 'James Caan', '1940-03-26', 'M'),
(27, 'Joseph Gordon-Levitt', '1981-02-17', 'M'),
(28, 'Lee J. Cobb', '1911-12-08', 'M'),
(29, 'Lee Van Cleef', '1925-01-09', 'M'),
(30, 'Martin Balsam', '1919-11-04', 'M'),
(31, 'Meat Loaf', '1947-09-27', 'M'),
(32, 'Morgan Freeman', '1937-06-01', 'M'),
(33, 'Orlando Bloom', '1977-01-13', 'M'),
(34, 'Ralph Fiennes', '1962-12-22', 'M'),
(35, 'Robert De Niro', '1943-08-17', 'M'),
(36, 'Robert Duvall', '1931-01-05', 'M'),
(37, 'Robin Wright', '1966-04-08', 'F'),
(38, 'Samuel L. Jackson', '1948-12-21', 'M'),
(39, 'Uma Thurman', '1970-04-29', 'F'),
(40, 'Viggo Mortensen', '1958-10-20', 'M'),
(41, 'Brad Pitt', '1963-12-18', 'M'),
(42, 'Christian Bale', '1974-01-30', 'M'),
(43, 'Clint Eastwood', '1930-05-31', 'M'),
(44, 'Elijah Wood', '1981-01-28', 'M'),
(45, 'Henry Fonda', '1905-09-18', 'M'),
(46, 'John Travolta', '1954-02-18', 'M'),
(47, 'Leonardo DiCaprio', '1974-11-11', 'M'),
(48, 'Liam Neeson', '1952-06-07', 'M'),
(49, 'Mark Hamill', '1951-09-25', 'M'),
(50, 'Marlon Brando', '1924-04-03', 'M'),
(51, 'Tom Hanks', '1956-07-09', 'M'),
(52, 'Tim Robbins', '1958-10-16', 'M');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pontuacao`
--

CREATE TABLE `pontuacao` (
  `idutilizador` int(11) NOT NULL,
  `idfilme` int(11) NOT NULL,
  `pontuacao` float NOT NULL,
  `comentario` text COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `pontuacao`
--

INSERT INTO `pontuacao` (`idutilizador`, `idfilme`, `pontuacao`, `comentario`) VALUES
(1, 1, 9.2, 'Não é à toa que o filme tem uma classificação tão alta, é literalmente de tirar o fôlego.\r\n'),
(1, 2, 8.1, 'Um dos melhores filmes de todos os tempos, uma obra-prima absoluta. O Poderoso Chefão é sem dúvida o melhor drama de gângster, além de estabelecer o padrão para o cinema.\r\n'),
(1, 5, 9.1, 'Por um tempo, não fui muito receptivo a assistir a filmes muito antigos. Sempre achei que seria difícil me envolver no contexto, não poderia estar mais enganado! 12 homens furiosos, é um ótimo exemplo de como um simples filme pode fazer mágica com bons atores, e que ótimos atores eles são!\r\n'),
(1, 6, 7.2, 'Deixa um sem palavras - comovente, sombrio e horripilante. Um dos piores momentos da Humanidade - Algo que ninguém deveria esquecer.\r\n'),
(1, 8, 9.5, 'Antes de ver isso, presumi que provavelmente era superestimado. Eu estava errado. Ele faz jus e supera sua reputação em praticamente todos os aspectos. Eu recomendaria definitivamente.\r\n'),
(1, 9, 8.5, 'É minha firme convicção que as versões padrão de O Senhor dos Anéis devem ser descartadas em favor das edições estendidas universalmente. Claro, a duração de quase 4 horas é um pouco íngreme, mas para uma obra-prima absoluta como essa, é um trabalho a cada segundo e o primeiro ato da melhor trilogia da história cinematográfica!\r\n'),
(1, 10, 8.3, 'Vou ser breve: este é simplesmente um dos westerns mais divertidos e bonitos de todos os tempos. O uso único da câmera pelo diretor Sergio Leone - tomadas longas e ininterruptas em grande angular alternando com close-ups extremos - e a trilha sonora única e extremamente inventiva de Ennio Morricone são combinadas com perfeição.\r\n'),
(1, 11, 8.9, 'Lembro-me de John Byner, o comediante de stand-up e impressionista dos anos 1970 falando sobre caras chorando no cinema, como não é um comportamento aceitável. Ele aconselhou os homens em sua audiência a largar suas chaves, fazer algo que os levasse a se inclinar para frente, enxugar seus rostos e manter as coisas sob controle.\r\n'),
(1, 12, 8.7, 'Porque você provavelmente ficará confuso na primeira vez. Não é por acaso que estrela alguns dos maiores atores do nosso tempo.\r\n'),
(1, 13, 8.6, 'A Origem é o meu filme favorito número um dos meus doze anos na terra! É absolutamente impossível explicar o incrível que Inception tem. A Origem é muuuuito emocionante, na ponta do assento, alucinante, e eu gostaria que houvesse mais filmes como esse e mais Christopher Nolans por aí. Parabéns ao merecido melhor diretor, escritor e produtor de filmes (na minha opinião).\r\n'),
(1, 14, 8.4, 'In a film like The Empire Strikes Back, especially a few years on the heels of such a mind-bogglingly great film like the original Star Wars, there is something that comes immediately to mind that would at first seem to count against the film, but instead only winds up increasing the respect that it commands. In the 1977\r\n'),
(1, 15, 8.3, 'Toda a diversão do original com um enredo muito melhor e mais sombrio.\r\n'),
(2, 1, 9.3, 'É a história, a atuação, a premissa, mas acima de tudo, este filme é sobre como nos sentimos.\r\n'),
(2, 3, 7.9, 'Dirigido com confiança, sombrio, pensativo e repleto de sequências de ação impressionantes e uma história complexa, O Cavaleiro das Trevas inclui uma virada de Heath Ledger para definir a carreira, bem como outras performances dignas de Oscar, TDK continua não apenas o melhor filme do Batman, mas também a história em quadrinhos. filme já criado.\r\n'),
(2, 6, 6.9, 'A Lista de Schindler é quase impecável em todas as categorias. Um filme imperdível por razões além do entretenimento.\r\n'),
(2, 15, 8.3, 'A Rebelião deu um golpe importante ao poder do Império ao destruir sua Estrela da Morte, no entanto, o poder do Lado Negro da Força permanece forte e continua a caçar a rebelião.							\r\n'),
(4, 1, 8.9, 'A história final de amizade, de esperança e de vida, e superação da adversidade.\r\n'),
(4, 4, 8.4, 'Um dos maiores de todos os tempos. Ou provavelmente a melhor coisa já feita na história da cinematografia. Este filme é \"prequel\" e \"sequência\" do primeiro filme do padrinho. Eu nunca assisti algo assim em toda a minha vida.\r\n'),
(4, 15, 9.7, 'Enquanto a base da Rebelião em Hoth está sob tratamento, Luke foi a um planeta distante do pântano para receber mais treinamento Jedi do Mestre Yoda. No entanto, o poder do lado negro não deve ser subestimado	e muitas verdades sombrias são reveladas à medida que a ameaça do Império se aproxima.							\r\n'),
(5, 1, 8.5, 'Eu entendo porque tantos classificam este como o melhor filme de todos os tempos.\r\n');

-- --------------------------------------------------------

--
-- Estrutura da tabela `poster`
--

CREATE TABLE `poster` (
  `idposter` int(11) NOT NULL,
  `idFilme` int(11) NOT NULL,
  `urlposter` varchar(100) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `poster`
--

INSERT INTO `poster` (`idposter`, `idFilme`, `urlposter`) VALUES
(1, 1, 'https://www.themoviedb.org/t/p/w1280/hBcY0fE9pfXzvVaY4GKarweriG2.jpg'),
(2, 2, 'https://www.themoviedb.org/t/p/w1280/3Tf8vXykYhzHdT0BtsYTp570JGQ.jpg'),
(3, 3, 'https://www.themoviedb.org/t/p/w1280/pKKvCaL1TPTVtbI6EeliyND3api.jpg\r\n'),
(4, 4, 'https://www.themoviedb.org/t/p/w1280/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg\r\n'),
(5, 5, 'https://www.themoviedb.org/t/p/w1280/ppd84D2i9W8jXmsyInGyihiSyqz.jpg\r\n'),
(6, 6, 'https://www.themoviedb.org/t/p/w1280/8Ub37aAI5BpgJUy03m3k3qdVLuT.jpg\r\n'),
(7, 7, 'https://www.themoviedb.org/t/p/w1280/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg\r\n'),
(8, 8, 'https://www.themoviedb.org/t/p/w1280/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg\r\n'),
(9, 9, 'https://www.themoviedb.org/t/p/w1280/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg\r\n'),
(10, 10, 'https://www.themoviedb.org/t/p/w1280/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg\r\n'),
(11, 11, 'https://www.themoviedb.org/t/p/w1280/h5J4W4veyxMXDMjeNxZI46TsHOb.jpg\r\n'),
(12, 12, 'https://www.themoviedb.org/t/p/w1280/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg'),
(13, 13, 'https://www.themoviedb.org/t/p/w1280/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg'),
(14, 14, 'https://www.themoviedb.org/t/p/w1280/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg\r\n'),
(15, 15, 'https://www.themoviedb.org/t/p/w1280/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `realizador`
--

CREATE TABLE `realizador` (
  `idpessoa` int(11) NOT NULL,
  `idfilme` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `realizador`
--

INSERT INTO `realizador` (`idpessoa`, `idfilme`) VALUES
(1, 1),
(2, 2),
(3, 3),
(8, 8),
(2, 4),
(5, 5),
(6, 6),
(7, 7),
(7, 9),
(10, 10),
(11, 11),
(12, 12),
(3, 13),
(7, 14),
(13, 15),
(15, 33),
(26, 33);

-- --------------------------------------------------------

--
-- Estrutura da tabela `utilizador`
--

CREATE TABLE `utilizador` (
  `idutilizador` int(11) NOT NULL,
  `nome` varchar(100) COLLATE latin1_bin NOT NULL,
  `email` varchar(100) COLLATE latin1_bin NOT NULL,
  `password` varchar(100) COLLATE latin1_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `utilizador`
--

INSERT INTO `utilizador` (`idutilizador`, `nome`, `email`, `password`) VALUES
(1, 'António', 'antonionobre@hotmail.com', '12345678'),
(2, 'Carlos', 'carmanoli@gmail.com', '12345678'),
(3, 'João Canete', 'jimmy@gmail.com', '12345678'),
(4, 'Felício', 'felicio@gmail.com', '12345678'),
(5, 'Luisa', 'Luisa@gmail.com', '12345678'),
(7, 'xpto200', 'antonionobre@hotmail.com', '12345678'),
(8, 'xpto', 'antonionobre@hotmail.com', '12345678'),
(13, 'pedro', 'antonionobre@hotmail.com', '12345678'),
(14, 'Paulo', 'antonionobre@hotmail.com', '12345678'),
(500, 'Paula', 'antonionobre@hotmail.com', '12345678'),
(501, 'Paula1', 'antonionobre@hotmail.com', '12345678'),
(200000000, 'Paula2', 'antonionobre@hotmail.com', '12345678');

-- --------------------------------------------------------

--
-- Estrutura da tabela `visualizacao`
--

CREATE TABLE `visualizacao` (
  `idvisualizacao` int(11) NOT NULL,
  `datahora` datetime NOT NULL,
  `idutilizador` int(11) NOT NULL,
  `idfilme` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

--
-- Extraindo dados da tabela `visualizacao`
--

INSERT INTO `visualizacao` (`idvisualizacao`, `datahora`, `idutilizador`, `idfilme`) VALUES
(1, '2022-09-13 11:41:11', 1, 13),
(2, '2022-09-13 11:41:11', 2, 12),
(3, '2022-09-13 11:41:11', 4, 2),
(4, '2022-09-13 11:41:11', 3, 1),
(5, '2022-09-13 11:42:09', 5, 3),
(6, '2022-09-13 11:42:09', 3, 8),
(7, '2022-09-13 11:42:42', 1, 15),
(8, '2022-09-13 11:42:42', 1, 10);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `ator`
--
ALTER TABLE `ator`
  ADD KEY `atorfilme` (`idfilme`),
  ADD KEY `atorpessoa` (`idpessoa`);

--
-- Índices para tabela `designacaopadonizada`
--
ALTER TABLE `designacaopadonizada`
  ADD PRIMARY KEY (`idDesignacaoPadronizada`);

--
-- Índices para tabela `filme`
--
ALTER TABLE `filme`
  ADD PRIMARY KEY (`idfilme`),
  ADD KEY `siglaidioma` (`siglaidoma`);

--
-- Índices para tabela `filmegenero`
--
ALTER TABLE `filmegenero`
  ADD KEY `filme` (`idfilme`),
  ADD KEY `genero` (`idgenero`);

--
-- Índices para tabela `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`idgenero`);

--
-- Índices para tabela `idioma`
--
ALTER TABLE `idioma`
  ADD PRIMARY KEY (`siglaidioma`);

--
-- Índices para tabela `listadesignacaopadronizada`
--
ALTER TABLE `listadesignacaopadronizada`
  ADD PRIMARY KEY (`idListaFilme`),
  ADD KEY `padronizada_designacao` (`idDesignacaoPadronizada`);

--
-- Índices para tabela `listadesignacaopersonalizada`
--
ALTER TABLE `listadesignacaopersonalizada`
  ADD PRIMARY KEY (`idListaFilme`);

--
-- Índices para tabela `listafilme`
--
ALTER TABLE `listafilme`
  ADD PRIMARY KEY (`idlistafilme`),
  ADD KEY `listafilme_utilizador` (`idutilizador`);

--
-- Índices para tabela `listafilmeconteudo`
--
ALTER TABLE `listafilmeconteudo`
  ADD PRIMARY KEY (`idListaFilme`,`idFilme`),
  ADD KEY `listaconteudo_filme` (`idFilme`);

--
-- Índices para tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD PRIMARY KEY (`idpessoa`);

--
-- Índices para tabela `pontuacao`
--
ALTER TABLE `pontuacao`
  ADD PRIMARY KEY (`idutilizador`,`idfilme`),
  ADD KEY `pontuacaofilme` (`idfilme`);

--
-- Índices para tabela `poster`
--
ALTER TABLE `poster`
  ADD PRIMARY KEY (`idposter`),
  ADD KEY `posterfilme` (`idFilme`);

--
-- Índices para tabela `realizador`
--
ALTER TABLE `realizador`
  ADD KEY `realizadorfilme` (`idfilme`),
  ADD KEY `realizadorpessoa` (`idpessoa`);

--
-- Índices para tabela `utilizador`
--
ALTER TABLE `utilizador`
  ADD PRIMARY KEY (`idutilizador`);

--
-- Índices para tabela `visualizacao`
--
ALTER TABLE `visualizacao`
  ADD PRIMARY KEY (`idvisualizacao`),
  ADD KEY `idutilizador` (`idutilizador`),
  ADD KEY `visualizacaofilme` (`idfilme`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `designacaopadonizada`
--
ALTER TABLE `designacaopadonizada`
  MODIFY `idDesignacaoPadronizada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `filme`
--
ALTER TABLE `filme`
  MODIFY `idfilme` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de tabela `genero`
--
ALTER TABLE `genero`
  MODIFY `idgenero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `listafilme`
--
ALTER TABLE `listafilme`
  MODIFY `idlistafilme` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `pessoa`
--
ALTER TABLE `pessoa`
  MODIFY `idpessoa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de tabela `poster`
--
ALTER TABLE `poster`
  MODIFY `idposter` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `utilizador`
--
ALTER TABLE `utilizador`
  MODIFY `idutilizador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=200000001;

--
-- AUTO_INCREMENT de tabela `visualizacao`
--
ALTER TABLE `visualizacao`
  MODIFY `idvisualizacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `ator`
--
ALTER TABLE `ator`
  ADD CONSTRAINT `atorfilme` FOREIGN KEY (`idfilme`) REFERENCES `filme` (`idfilme`),
  ADD CONSTRAINT `atorpessoa` FOREIGN KEY (`idpessoa`) REFERENCES `pessoa` (`idpessoa`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `filme`
--
ALTER TABLE `filme`
  ADD CONSTRAINT `siglaidioma` FOREIGN KEY (`siglaidoma`) REFERENCES `idioma` (`siglaidioma`);

--
-- Limitadores para a tabela `filmegenero`
--
ALTER TABLE `filmegenero`
  ADD CONSTRAINT `filme` FOREIGN KEY (`idfilme`) REFERENCES `filme` (`idfilme`),
  ADD CONSTRAINT `genero` FOREIGN KEY (`idgenero`) REFERENCES `genero` (`idgenero`);

--
-- Limitadores para a tabela `listadesignacaopadronizada`
--
ALTER TABLE `listadesignacaopadronizada`
  ADD CONSTRAINT `padronizada_designacao` FOREIGN KEY (`idDesignacaoPadronizada`) REFERENCES `designacaopadonizada` (`idDesignacaoPadronizada`),
  ADD CONSTRAINT `padronizada_listafilme` FOREIGN KEY (`idListaFilme`) REFERENCES `listafilme` (`idlistafilme`);

--
-- Limitadores para a tabela `listadesignacaopersonalizada`
--
ALTER TABLE `listadesignacaopersonalizada`
  ADD CONSTRAINT `personalizada_listafilme` FOREIGN KEY (`idListaFilme`) REFERENCES `listafilme` (`idlistafilme`);

--
-- Limitadores para a tabela `listafilme`
--
ALTER TABLE `listafilme`
  ADD CONSTRAINT `listafilme_utilizador` FOREIGN KEY (`idutilizador`) REFERENCES `utilizador` (`idutilizador`);

--
-- Limitadores para a tabela `listafilmeconteudo`
--
ALTER TABLE `listafilmeconteudo`
  ADD CONSTRAINT `listaconteudo_filme` FOREIGN KEY (`idFilme`) REFERENCES `filme` (`idfilme`),
  ADD CONSTRAINT `listaconteudo_lista` FOREIGN KEY (`idListaFilme`) REFERENCES `listafilme` (`idlistafilme`);

--
-- Limitadores para a tabela `pontuacao`
--
ALTER TABLE `pontuacao`
  ADD CONSTRAINT `pontuacaofilme` FOREIGN KEY (`idfilme`) REFERENCES `filme` (`idfilme`),
  ADD CONSTRAINT `pontuacaoutilizador` FOREIGN KEY (`idutilizador`) REFERENCES `utilizador` (`idutilizador`);

--
-- Limitadores para a tabela `poster`
--
ALTER TABLE `poster`
  ADD CONSTRAINT `posterfilme` FOREIGN KEY (`idFilme`) REFERENCES `filme` (`idfilme`);

--
-- Limitadores para a tabela `realizador`
--
ALTER TABLE `realizador`
  ADD CONSTRAINT `realizadorfilme` FOREIGN KEY (`idfilme`) REFERENCES `filme` (`idfilme`),
  ADD CONSTRAINT `realizadorpessoa` FOREIGN KEY (`idpessoa`) REFERENCES `pessoa` (`idpessoa`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `visualizacao`
--
ALTER TABLE `visualizacao`
  ADD CONSTRAINT `visualizacao_ibfk_1` FOREIGN KEY (`idutilizador`) REFERENCES `utilizador` (`idutilizador`),
  ADD CONSTRAINT `visualizacaofilme` FOREIGN KEY (`idfilme`) REFERENCES `filme` (`idfilme`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
