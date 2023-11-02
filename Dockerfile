FROM amazoncorretto:17-alpine
VOLUME /tmp
ARG JAR_FILE=/build/libs/UrlShortener-1.0.0.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]