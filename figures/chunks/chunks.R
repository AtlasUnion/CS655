library(ggplot2)
library(plyr)

c1000w5 <- read.csv("chunk1000w5", header=FALSE)
c1000w10 <- read.csv("chunk1000w10", header=FALSE)
c2000w5 <- read.csv("chunk2000w5", header=FALSE)
c2000w10 <- read.csv("chunk2000w10", header=FALSE)
c4000w5 <- read.csv("chunk4000w5", header=FALSE)
c4000w10 <- read.csv("chunk4000w10", header=FALSE)
c8000w5 <- read.csv("chunk8000w5", header=FALSE)
c8000w10 <- read.csv("chunk8000w10", header=FALSE)
c16000w5 <- read.csv("chunk16000w5", header=FALSE)
c16000w10 <- read.csv("chunk16000w10", header=FALSE)

names <- c('time','freq', 'num_servers')
r1w5 <-data.frame(r1w5, rep(1, 100), rep(5, 100))
colnames(r1w5) <- names
r1w10 <-data.frame(r1w10, rep(1, 100), rep(10, 100))
colnames(r1w10) <- names
r10w5 <-data.frame(r10w5, rep(10, 100), rep(5, 100))
colnames(r10w5) <- names
r10w10 <-data.frame(r10w10, rep(10, 100), rep(10, 100))
colnames(r10w10) <- names
r100w5 <-data.frame(r100w5, rep(100, 100), rep(5, 100))
colnames(r100w5) <- names
r100w10 <-data.frame(r100w10, rep(100, 100), rep(10, 100))
colnames(r100w10) <- names
r1000w5 <-data.frame(r1000w5, rep(1000, 100), rep(5, 100))
colnames(r1000w5) <- names
r1000w10 <-data.frame(r1000w10, rep(1000, 100), rep(10, 100))
colnames(r1000w10) <- names

df <- rbind(r1w5, r1w10, r10w5, r10w10, r100w5, r100w10, r1000w5, r1000w10)
df$freq <- as.factor(df$freq)
df$num_servers <- as.factor(df$num_servers)


# Basic dot plot
p<-ggplot(df, aes(x=freq, y=time)) + 
  geom_dotplot(binaxis='y', stackdir='center', binwidth = 2000)
p
p + stat_summary(fun.y=mean, geom="point", shape=18,
                 size=3, color="red")

data_summary <- function(data, varname, groupnames){
  require(plyr)
  summary_func <- function(x, col){
    c(mean = mean(x[[col]], na.rm=TRUE),
      sd = sd(x[[col]], na.rm=TRUE))
  }
  data_sum<-ddply(data, groupnames, .fun=summary_func,
                  varname)
  data_sum <- rename(data_sum, c("mean" = varname))
  return(data_sum)
}


df2 <- data_summary(df, varname="time", 
                    groupnames=c("num_servers", "freq"))
# Convert dose to a factor variable
df2$freq=as.factor(df2$freq)
head(df2)


p<- ggplot(df2, aes(x=freq, y=time, group=num_servers, color=num_servers)) + 
  geom_line() +
  geom_point()+
  geom_errorbar(aes(ymin=time-sd, ymax=time+sd), width=.2,
                position=position_dodge(0.05))+
  ylim(0,80000)
print(p)


