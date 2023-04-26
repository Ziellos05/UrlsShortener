FROM amazoncorretto:17-alpine
VOLUME /tmp
ARG JAR_FILE=/applications/app-service/build/libs/url-shortener.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]