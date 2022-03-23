FROM node:14-alpine as build

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Install Fonts
RUN apk --update --upgrade --no-cache add fontconfig ttf-freefont font-noto terminus-font ttf-dejavu
RUN wget https://fonts.google.com/download?family=Poppins -O ~/poppins.zip
RUN unzip -x ~/poppins.zip -d ~/poppins/
RUN mkdir -p /usr/share/fonts/truetype/google-fonts
RUN find ~/poppins/ -name "*.ttf" -exec install -m644 {} /usr/share/fonts/truetype/google-fonts/ \; || return 1
RUN rm -rf ~/poppins
RUN rm -rf ~/poppins.zip
RUN fc-cache -f \
    && fc-list | sort

# Bundle app source
COPY . .

EXPOSE 3000

HEALTHCHECK --interval=12s --timeout=12s --start-period=30s \  
    CMD node healthcheck.js

CMD [ "server.js" ]