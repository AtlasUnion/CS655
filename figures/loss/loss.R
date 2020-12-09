library(ggplot2)
library(plyr)

loss0 <- read.csv("loss0d0", header=FALSE)
loss.01 <- read.csv("lossx01d0", header=FALSE)
loss.1 <- read.csv("lossx1d0", header=FALSE)
loss1 <- read.csv("loss1xd0", header=FALSE)


names <- c('time', 'loss')
loss0 <-data.frame(loss0, rep(0, 100))
colnames(loss0) <- names
loss.01 <-data.frame(loss.01, rep(.01, 100))
colnames(loss.01) <- names
loss.1 <-data.frame(loss.1, rep(.1, 100))
colnames(loss.1) <- names
loss1 <-data.frame(loss1, rep(1, 100))
colnames(loss1) <- names


df <- rbind(loss0, loss.01, loss.1, loss1)
df$loss <- as.factor(df$loss)


# dot plot with colors
p<-ggplot(df, aes(x=loss, y=time, fill=loss))+
  geom_boxplot() +
  geom_dotplot(binaxis='y', stackdir='center', binwidth = 1000) +
  ggtitle("Crack Time by Packet Loss Rate") +
  xlab("Loss Rate (%)") + ylab("Crack Time (ms)") +
  theme(plot.title = element_text(hjust = 0.5)) +
  stat_summary(fun.y=mean, geom="point", shape=18,size=3, color='black') +
  stat_summary(fun.y = mean, color = "black", geom = "line", size=.5)+
  theme(legend.position = "none")

p
