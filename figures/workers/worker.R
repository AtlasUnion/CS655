library(ggplot2)
library(plyr)

s2 <- read.csv("server2", header=TRUE)
s4 <- read.csv("server4", header=FALSE)
s6 <- read.csv("server6", header=FALSE)
s8 <- read.csv("server8", header=FALSE)
s10 <- read.csv("server10", header=FALSE)


names <- c('time', 'num_servers')
s2 <-data.frame(s2, rep(2, 100))
colnames(s2) <- names
s4 <-data.frame(s4, rep(4, 100))
colnames(s4) <- names
s6 <-data.frame(s6, rep(6, 100))
colnames(s6) <- names
s8 <-data.frame(s8, rep(8, 100))
colnames(s8) <- names
s10 <-data.frame(s10, rep(10, 100))
colnames(s10) <- names

df <- rbind(s2, s4, s6, s8, s10)
df$num_servers <- as.factor(df$num_servers)


# dot plot with colors
p<-ggplot(df, aes(x=num_servers, y=time, fill=num_servers))+
  geom_boxplot() +
  geom_dotplot(binaxis='y', stackdir='center', binwidth = 3000) +
  ggtitle("Crack Time by Number of Worker Nodes") +
  xlab("Number of Workers") + ylab("Crack Time (ms)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  stat_summary(fun.y=mean, geom="point", shape=18,size=3, color='black') +
  stat_summary(fun.y = mean, color = "black", geom = "line", size=.5)+
  theme(legend.position = "none")

p
